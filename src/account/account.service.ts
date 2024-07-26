import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common'
import { PrismaService } from 'prisma/prisma.service'
import { TransactionService } from 'src/transaction/transaction.service'
import {
  StatusType,
  TransactionType,
} from 'src/transaction/dto/transaction.dto'
import { RecipientAccountDto } from './dto/account.dto'

@Injectable()
export class AccountService {
  constructor(
    private prisma: PrismaService,
    private transactionService: TransactionService,
  ) {}

  async deposit(accountNumber: string, amount: number) {
    const account = await this.prisma.account.findUnique({
      where: { account_number: accountNumber },
    })

    if (!account) {
      throw new NotFoundException('Account not found')
    }

    const updatedAccount = await this.prisma.account.update({
      where: { account_number: accountNumber },
      data: { balance: { increment: amount } },
    })

    await this.transactionService.createTransaction({
      accountId: account.id,
      type: 'DEPOSIT' as TransactionType,
      amount,
      status: 'COMPLETED' as StatusType,
    })

    return updatedAccount
  }

  async withdraw(accountNumber: string, amount: number) {
    const account = await this.prisma.account.findUnique({
      where: { account_number: accountNumber },
    })

    if (!account) {
      throw new NotFoundException('Account not found')
    }

    if (account.balance < amount) {
      throw new BadRequestException('Insufficient funds')
    }

    const updatedAccount = await this.prisma.account.update({
      where: { account_number: accountNumber },
      data: { balance: { decrement: amount } },
    })

    await this.transactionService.createTransaction({
      accountId: account.id,
      type: 'WITHDRAWAL' as TransactionType,
      amount,
      status: 'COMPLETED' as StatusType,
    })

    return updatedAccount
  }

  async getAccountBalance(accountNumber: string) {
    const account = await this.prisma.account.findUnique({
      where: { account_number: accountNumber },
      select: { balance: true },
    })

    if (!account) {
      throw new NotFoundException('Account not found')
    }

    return account
  }

  async getAccountByAccountNumber(accountNumber: string) {
    const account = await this.prisma.account.findUnique({
      where: { account_number: accountNumber },
    })

    if (!account) {
      throw new NotFoundException('Account not found')
    }

    return account
  }

  async transfer(fromAccountNumber: string, recipient: RecipientAccountDto) {
    const fromAccount = await this.prisma.account.findUnique({
      where: { account_number: fromAccountNumber },
    })
    const toAccount = await this.prisma.account.findUnique({
      where: { account_number: recipient.account_number },
    })

    if (!toAccount) {
      throw new NotFoundException('Recipient account not found')
    }

    if (fromAccount.balance < recipient.amount) {
      throw new BadRequestException('Insufficient funds in the source account')
    }

    const updateFromAccount = this.prisma.account.update({
      where: { account_number: fromAccountNumber },
      data: { balance: { decrement: recipient.amount } },
    })

    const updateToAccount = this.prisma.account.update({
      where: { account_number: recipient.account_number },
      data: { balance: { increment: recipient.amount } },
    })

    await this.prisma.$transaction([updateFromAccount, updateToAccount])

    await this.transactionService.createTransaction({
      accountId: fromAccount.id,
      type: 'TRANSFER_SENT' as TransactionType,
      amount: recipient.amount,
      status: 'COMPLETED' as StatusType,
    })

    await this.transactionService.createTransaction({
      accountId: toAccount.id,
      type: 'TRANSFER_RECEIVED' as TransactionType,
      amount: recipient.amount,
      status: 'COMPLETED' as StatusType,
    })

    const newBalance = await this.getAccountBalance(fromAccountNumber)

    return { message: 'Transfer completed successfully', balance: newBalance.balance }
  }
}

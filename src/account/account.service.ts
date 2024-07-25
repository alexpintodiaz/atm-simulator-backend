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
}

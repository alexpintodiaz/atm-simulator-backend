import { Injectable } from '@nestjs/common'
import { PrismaService } from 'prisma/prisma.service'
import { CreateTransactionDto } from './dto/transaction.dto'

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  async createTransaction(transactionData: CreateTransactionDto) {
    return this.prisma.transaction.create({
      data: {
        ...transactionData,
        datetime: new Date(),
      },
    })
  }

  async getTransactionsByAccountId(accountId: string) {
    return this.prisma.transaction.findMany({
      where: { accountId },
      orderBy: { datetime: 'desc' },
    })
  }
}

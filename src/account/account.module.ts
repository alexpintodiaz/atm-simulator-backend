import { Module } from '@nestjs/common'
import { AccountController } from './account.controller'
import { AccountService } from './account.service'
import { PrismaService } from 'prisma/prisma.service'
import { TransactionService } from 'src/transaction/transaction.service'

@Module({
  controllers: [AccountController],
  providers: [AccountService, TransactionService, PrismaService],
})
export class AccountModule {}

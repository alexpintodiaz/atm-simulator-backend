import { Module } from '@nestjs/common'
import { AccountController } from './account.controller'
import { AccountService } from './account.service'
import { PrismaService } from 'prisma/prisma.service'
import { TransactionService } from 'src/transaction/transaction.service'
import { AuthService } from 'src/auth/auth.service'
import { UserService } from 'src/user/user.service'

@Module({
  controllers: [AccountController],
  providers: [AccountService, TransactionService, PrismaService, AuthService, UserService],
})
export class AccountModule {}

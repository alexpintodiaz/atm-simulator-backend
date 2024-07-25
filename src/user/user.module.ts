import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { PrismaService } from 'prisma/prisma.service'
import { AuthService } from 'src/auth/auth.service'
import { AccountService } from 'src/account/account.service'
import { TransactionService } from 'src/transaction/transaction.service'

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, AuthService, AccountService, TransactionService],
})
export class UserModule {}

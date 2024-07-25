import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AccountService } from 'src/account/account.service';
import { PrismaService } from 'prisma/prisma.service';
import { TransactionService } from 'src/transaction/transaction.service';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AccountService, PrismaService, TransactionService, UserService],
})
export class AuthModule {}

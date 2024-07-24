import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { AccountService } from './account.service'

@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Get('balance/:accountNumber')
  getAccountBalance(@Param('accountNumber') accountNumber: string) {
    return this.accountService.getAccountBalance(accountNumber)
  }

  @Get('/:accountNumber')
  getAccountByAccountNumber(@Param('accountNumber') accountNumber: string) {
    return this.accountService.getAccountByAccountNumber(accountNumber)
  }

  @Post('deposit/:accountNumber')
  deposit(
    @Param('accountNumber') accountNumber: string,
    @Body('amount') amount: number,
  ) {
    return this.accountService.deposit(accountNumber, amount)
  }

  @Post('withdraw/:accountNumber')
  withdraw(
    @Param('accountNumber') accountNumber: string,
    @Body('amount') amount: number,
  ) {
    return this.accountService.withdraw(accountNumber, amount)
  }
}

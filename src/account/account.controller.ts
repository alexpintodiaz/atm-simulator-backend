import { Body, Controller, Get, HttpCode, Param, Post, Query } from '@nestjs/common'
import { AccountService } from './account.service'
import { RecipientAccountDto } from './dto/account.dto'

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
  @HttpCode(200)
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

  @Post('transfer')
  @HttpCode(200)
  transfer(
    @Query('sender') fromAccountNumber: string,
    @Body() recipient: RecipientAccountDto
  ) {
    return this.accountService.transfer(fromAccountNumber, recipient)

  }
}

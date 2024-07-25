import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { AuthenticationDto } from './dto/create-auth.dto'
import { AccountService } from 'src/account/account.service'
import { UserService } from 'src/user/user.service'

@Injectable()
export class AuthService {
  constructor(
    private accountService: AccountService,
    private userService: UserService,
  ) {}

  async authUser(credentials: AuthenticationDto) {
    const { account_number: accountNumber, pin: credentialsPin } = credentials

    const account =
      await this.accountService.getAccountByAccountNumber(accountNumber)

    if (!account) {
      throw new NotFoundException('Account not found')
    }

    if (credentialsPin == account.pin) {
      const user = await this.userService.getUserById(account.userId)
      return user
    } else {
      throw new UnauthorizedException('Incorrect PIN')
    }
  }
}

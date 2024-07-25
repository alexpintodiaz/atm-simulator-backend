import { Controller, Post, Body, HttpCode } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthenticationDto } from './dto/create-auth.dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @HttpCode(200)
  authenticate(@Body() createAuthDto: AuthenticationDto) {
    return this.authService.authUser(createAuthDto)
  }
}

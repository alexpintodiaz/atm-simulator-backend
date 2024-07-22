import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/user.dto'

@Controller('/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAllUsers() {
    return this.userService.getUsers()
  }

  @Get('/:id')
  getUserById(@Param('id', ParseIntPipe) id: string) {
    return this.userService.getUserById(id)
  }

  @Post()
  createUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user)
  }

  @Delete()
  deleteUser(@Query('id') id: string) {
    return this.userService.deleteUser(id)
  }
}

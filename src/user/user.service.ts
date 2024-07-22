import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateUserDto } from './dto/user.dto'
import { PrismaService } from 'prisma/prisma.service'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  //   getUsers() {
  //     return ['user1', 'user2']
  //   }

  getUsers() {
    return this.prisma.user.findMany()
  }

  getUserById(id: string) {
    return `se retorna usuario de ID : ${id}`
  }

  async createUser(user: CreateUserDto) {
    const result = await this.prisma.user.create({ data: user })
    return result
  }

  async deleteUser(id: string) {
    return this.prisma.user
      .delete({
        where: {
          id: id,
        },
      })
      .catch((error) => {
        throw new NotFoundException(error)
      })
  }
}

import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateUserDto } from './dto/user.dto'
import { PrismaService } from 'prisma/prisma.service'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUsers() {
    return this.prisma.user.findMany()
  }

  async getUserById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    })
    if (!user) {
      throw new NotFoundException('User not found')
    }
    return user
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

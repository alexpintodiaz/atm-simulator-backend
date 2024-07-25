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
      where: { id: id },
      include: { accounts: true },
    })
    if (!user) {
      throw new NotFoundException('User not found')
    }
    return user
  }

  async createUser(userData: CreateUserDto) {
    const { email, name, phone, pin } = userData

    return this.prisma.user.create({
      data: {
        email,
        name,
        phone,
        accounts: {
          create: {
            account_number: this.generateAccountNumber(),
            pin,
            balance: 0,
          },
        },
      },
      include: {
        accounts: true,
      },
    })
  }

  private generateAccountNumber(): string {
    return Math.floor(1000 + Math.random() * 9000).toString()
  }

  async deleteUser(id: string): Promise<{ message: string }> {
    const user = await this.prisma.user.findUnique({
      where: { id: id },
      include: { accounts: true },
    })

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`)
    }

    await this.prisma.$transaction(async (prisma) => {
      await prisma.transaction.deleteMany({
        where: {
          accountId: { in: user.accounts.map((account) => account.id) },
        },
      })

      await prisma.account.deleteMany({
        where: { userId: id },
      })

      await prisma.user.delete({ where: { id: id } })
    })

    return {
      message: `User with ID ${id} has been successfully deleted along with all associated accounts and transactions.`,
    }
  }
}

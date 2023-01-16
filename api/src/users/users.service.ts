import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { User } from '@prisma/client'
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) { }

  async create(dto: CreateUserDto): Promise<User> {
    const user = this.prisma.user.create({
      data: {
        ...dto,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    })
    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: { email }
    })
    return user ?? null
  }

  async isExist(email: string): Promise<boolean> {
    const user = await this.findByEmail(email)
    return user ? true : false
  }

}

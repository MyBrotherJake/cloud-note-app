import { Body, Controller, Post } from '@nestjs/common'
import { User } from '@prisma/client'
import { CreateUserDto } from './dto/create-user.dto'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly user: UsersService) { }

  @Post()
  async create(@Body() dto: CreateUserDto): Promise<User> {
    return await this.user.create(dto)
  }
}

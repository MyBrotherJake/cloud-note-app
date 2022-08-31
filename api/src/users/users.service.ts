import { UserRepository } from './user.repository';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}  
  
  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.createUser(createUserDto)
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ email })
    return user ?? null
  }

  async isExist(email: string): Promise<boolean> {
    const user = await this.findByEmail(email)
    return user ? true : false
  }
}

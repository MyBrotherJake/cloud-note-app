import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto) {
    const { name, email } = createUserDto
    const user = this.create({
      name,
      email,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })

    await this.save(user)
    return user
  }
}

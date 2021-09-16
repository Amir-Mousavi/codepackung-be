import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from 'src/repositories/user.entity';
import { UserBodyInterface } from 'src/interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async createUser(user: UserBodyInterface) {
    const newUser = await this.userRepository.save({
      ...user,
      password: user.password,
    });
    // this.userRepository.save()
    console.log({ newUser });

    return newUser;
  }
}

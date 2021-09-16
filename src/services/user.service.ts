import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from 'src/repositories/user.entity';
import { UserBodyInterface } from 'src/interfaces/user.interface';

import * as bcrypt from 'bcrypt';

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
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;

    const newUser = await this.userRepository.save(user);
    return newUser;
  }
}

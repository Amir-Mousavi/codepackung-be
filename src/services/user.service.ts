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

  async login(user: UserBodyInterface) {
    const findUser = await this.userRepository.findOne({ email: user?.email });

    if (!findUser) {
      return {
        type: 'user_not_found',
        message: 'There is no such a user',
      };
    }

    if (await bcrypt.compare(user.password, findUser.password)) {
      return {
        type: 'user_found',
        message: {
          ...findUser,
          password: null,
        },
      };
    } else {
      return {
        type: 'password_wrong',
        message: 'password is wrong',
      };
    }
  }
}

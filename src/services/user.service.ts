import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from 'src/repositories/user.entity';
import { UserBodyInterface } from 'src/interfaces/user.interface';

import * as bcrypt from 'bcrypt';
import { JwtService } from './jwt.service';

const key = 'shhhhh';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    private jwtService: JwtService,
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

  createToken(user, key) {
    return this.jwtService.sign(
      { ...user, date: Date.now(), password: null },
      key,
    );
  }

  createMasterToken(token) {
    return this.jwtService.sign(
      {
        token,
        date: Date.now(),
        iat: 30 * 24 * 60 * 60,
      },
      key,
    );
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
      const token = this.createToken(user, key);

      const masterToken = this.createMasterToken(token);

      return {
        type: 'user_found',
        message: {
          ...findUser,
          password: null,
          token,
          masterToken,
        },
      };
    } else {
      return {
        type: 'password_wrong',
        message: 'password is wrong',
      };
    }
  }

  async refreshToken(masterToken: string) {
    const user = this.jwtService.verifyMasterToken(masterToken, key);

    if (user) {
      const token = this.createToken(user, key);
      const masterToken = this.createMasterToken(token);

      return {
        token,
        masterToken,
      };
    }

    return {
      type: 'master_token_invalid',
      message: 'master token is not valid',
    };
  }
}

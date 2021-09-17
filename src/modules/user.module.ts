import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { userProviders } from 'src/providers/user.provider';
import { UserService } from 'src/services/user.service';
import { JwtService } from 'src/services/jwt.service';

import { UserController } from 'src/controllers/user.controller';

@Module({
  controllers: [UserController],
  imports: [DatabaseModule],
  providers: [...userProviders, UserService, JwtService],
})
export class UserModule {}

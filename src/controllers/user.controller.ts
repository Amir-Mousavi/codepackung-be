import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { UserService } from 'src/services/user.service';
import { Response } from 'express';
import { UserBodyInterface } from 'src/interfaces/user.interface';

@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async registerUser(
    @Body() userData: UserBodyInterface,
    @Res() response: Response,
  ) {
    if (!userData || !userData.password || !userData.email) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send('Email and password can not be null');
    }

    const newUser = await this.userService.createUser(userData);

    return response.status(HttpStatus.CREATED).send(newUser);
  }

  @Get()
  getUsers() {
    return this.userService.findAll();
  }
}

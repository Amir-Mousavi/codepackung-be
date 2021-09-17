import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { UserService } from 'src/services/user.service';
import { Response } from 'express';
import { UserBodyInterface } from 'src/interfaces/user.interface';

@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  async registerUser(
    @Body() userData: UserBodyInterface,
    @Res() response: Response,
  ) {
    if (!userData || !userData.password || !userData.email) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send('Email and password can not be null');
    }

    try {
      const newUser = await this.userService.createUser(userData);

      return response.status(HttpStatus.CREATED).send(newUser);
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') {
        return response.status(HttpStatus.BAD_REQUEST).send('Duplicated email');
      } else {
        return response
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send('Something went wrong');
      }
    }
  }

  @Get()
  getUsers() {
    return this.userService.findAll();
  }

  @Post('login')
  async login(@Body() body: UserBodyInterface) {
    return await this.userService.login(body);
  }

  @Post('refresh-token')
  refreshToken(@Body() body: any) {
    return this.userService.refreshToken(body?.masterToken);
  }
}

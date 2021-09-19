import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from './services/jwt.service';
import { UserService } from './services/user.service';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (!req?.headers?.authorization) {
      return res.status(HttpStatus.UNAUTHORIZED).send('UNAUTHORIZED');
    }
    const { authorization } = req?.headers;

    try {
      const verifyied = this.jwtService.verify(authorization, 'shhhhh');

      const user = await this.userService.userExist(verifyied?.email);
      console.log({ user });

      if (!user) {
        return res.status(HttpStatus.UNAUTHORIZED).send('UNAUTHORIZED');
      }

      req.headers.cookie = JSON.stringify(user);
    } catch (e) {
      return res.status(HttpStatus.UNAUTHORIZED).send('ivalid token');
    }

    next();
  }
}

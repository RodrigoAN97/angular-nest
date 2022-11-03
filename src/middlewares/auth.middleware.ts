import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { ExpressRequest } from 'src/expressRequest.interface';
import { verify } from 'jsonwebtoken';
import { UserService } from 'src/user/user.service';
import { UserEntity } from 'src/user/user.entity';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private userService: UserService) {}

  async use(req: ExpressRequest, res: Response, next: NextFunction) {
    console.log('authMiddleware', req.headers);
    if (!req.headers.authorization) {
      req.user = null;
      next();
    }

    const token = req.headers.authorization?.split(' ')[1];
    try {
      const decode = verify(token, 'todo list super secret') as UserEntity;
      const user = await this.userService.getUserById(decode.id);
      req.user = user;
      next();
    } catch (err) {
      req.user = null;
      next();
    }
  }
}

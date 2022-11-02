import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/Dtos/createUser.dto';
import { UserService } from './user.service';
import { IUserResponse } from './user.types';

@Controller('api/user')
export class UserController {
  constructor(private authService: UserService) {}

  @Post()
  createUser(
    @Body('user') createUserDto: CreateUserDto,
  ): Promise<IUserResponse> {
    return this.authService.createUser(createUserDto);
  }
}

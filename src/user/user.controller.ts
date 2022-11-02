import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/Dtos/createUser.dto';
import { UserService } from './user.service';

@Controller('api/auth')
export class UserController {
  constructor(private authService: UserService) {}

  @Post()
  createUser(@Body('auth') createUserDto: CreateUserDto) {
    return this.authService.createUser(createUserDto);
  }
}

import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/Dtos/createUser.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
  constructor(private authService: UserService) {}

  @Post()
  createUser(@Body('user') createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.authService.createUser(createUserDto);
  }
}

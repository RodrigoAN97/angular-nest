import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RegisterUserDto } from 'src/Dtos/registerUser.dto';
import { LoginUserDto } from 'src/Dtos/loginUser.dto';
import { UserService } from './user.service';
import { IUserResponse } from './user.types';

@Controller('api/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  CreateUser(
    @Body('user') createUserDto: RegisterUserDto,
  ): Promise<IUserResponse> {
    return this.userService.createUser(createUserDto);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async Login(@Body('user') loginDto: LoginUserDto): Promise<IUserResponse> {
    return this.userService.login(loginDto);
  }
}

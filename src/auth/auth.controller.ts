import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/Dtos/createUser.dto';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  createUser(@Body('auth') createUserDto: CreateUserDto) {
    return this.authService.createUser(createUserDto);
  }
}

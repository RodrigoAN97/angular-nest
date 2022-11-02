import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/Dtos/createUser.dto';

@Injectable()
export class AuthService {
  createUser(createUserDto: CreateUserDto) {
    return createUserDto;
  }
}

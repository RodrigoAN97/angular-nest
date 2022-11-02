import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/Dtos/createUser.dto';

@Injectable()
export class UserService {
  createUser(createUserDto: CreateUserDto) {
    return createUserDto;
  }
}

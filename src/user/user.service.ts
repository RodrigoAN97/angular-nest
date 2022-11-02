import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/Dtos/createUser.dto';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { IUserResponse } from './user.types';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<IUserResponse> {
    const newUser = new UserEntity();
    Object.assign(newUser, createUserDto);
    const user = await this.userRepository.save(newUser);
    return {
      user: {
        id: user.id,
        displayName: user.displayName,
        email: user.email,
        token: this.generateToken(user),
      },
    };
  }

  generateToken(user: UserEntity): string {
    return sign(
      {
        id: user.id,
        displayName: user.displayName,
        email: user.email,
      },
      'todo list super secret',
    );
  }
}

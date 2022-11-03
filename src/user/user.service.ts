import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterUserDto } from 'src/Dtos/registerUser.dto';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { IUserResponse } from './user.types';
import { LoginUserDto } from 'src/Dtos/loginUser.dto';
import { compare } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: RegisterUserDto): Promise<IUserResponse> {
    const emailCheck = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    const displayNameCheck = await this.userRepository.findOne({
      where: { displayName: createUserDto.displayName },
    });
    if (emailCheck || displayNameCheck) {
      throw new HttpException(
        `Already taken - ${emailCheck ? 'EMAIL' : ''} ${
          displayNameCheck ? 'DISPLAY_NAME' : ''
        }`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const newUser = new UserEntity();
    Object.assign(newUser, createUserDto);
    const user = await this.userRepository.save(newUser);
    return this.getUserResponse(user);
  }

  async login(loginUserDto: LoginUserDto): Promise<IUserResponse> {
    const user = await this.userRepository.findOne({
      where: { email: loginUserDto.email },
    });

    if (!user) {
      throw new HttpException("Email doesn't exist", HttpStatus.UNAUTHORIZED);
    }

    const isPasswordCorrect = await compare(
      loginUserDto.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new HttpException(
        'Password is not correct',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return this.getUserResponse(user);
  }

  async getUserById(id: number): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { id } });
  }

  getUserResponse(user: UserEntity): IUserResponse {
    return {
      user: {
        id: user.id,
        displayName: user.displayName,
        email: user.email,
        token: this.generateToken(user),
      },
    };
  }

  private generateToken(user: UserEntity): string {
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

import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RegisterUserDto } from '../Dtos/registerUser.dto';
import { LoginUserDto } from '../Dtos/loginUser.dto';
import { UserService } from './user.service';
import { IUserResponse } from '../interfaces/user.interfaces';
import { ExpressRequest } from '../interfaces/expressRequest.interface';
import { AllowUnauthorizedRequest } from '../decorators/allowUnauthorizedRequest';

@Controller('api/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async currentUser(@Req() request: ExpressRequest): Promise<IUserResponse> {
    return this.userService.getUserResponse(request.user);
  }

  @Post('register')
  @AllowUnauthorizedRequest()
  @UsePipes(new ValidationPipe())
  async createUser(
    @Body('user') createUserDto: RegisterUserDto,
  ): Promise<IUserResponse> {
    return await this.userService.createUser(createUserDto);
  }

  @Post('login')
  @AllowUnauthorizedRequest()
  @UsePipes(new ValidationPipe())
  async Login(@Body('user') loginDto: LoginUserDto): Promise<IUserResponse> {
    return this.userService.login(loginDto);
  }
}

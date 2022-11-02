import { UserEntity } from './user.entity';

export interface IUserResponse {
  user: Omit<UserEntity, 'hashPassword' | 'password'> & { token: string };
}

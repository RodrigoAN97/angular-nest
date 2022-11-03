import { UserEntity } from '../user/user.entity';

export interface IUserResponse {
  user: Omit<UserEntity, 'hashPassword' | 'password'> & { token: string };
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  email: string;
  password: string;
  displayName: string;
}

export interface IUserResponse {
  user: { displayName: string; email: string; id: number; token: string };
}

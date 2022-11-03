import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILogin, IRegister } from './auth.types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  login(loginPayload: ILogin) {
    return this.httpClient.post(`http://localhost:3000/api/user/login`, {
      user: loginPayload,
    });
  }

  register(registerPayload: IRegister) {
    return this.httpClient.post(`http://localhost:3000/api/user/register`, {
      user: registerPayload,
    });
  }

  logout() {}
}

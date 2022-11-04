import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ILogin, IRegister } from './auth.types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient, private router: Router) {}

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

  logout() {
    this.router.navigate(['/auth']);
    localStorage.setItem('todo_user', '');
  }

  validateUser() {
    const stored = localStorage.getItem('todo_user') as string;
    const token = stored ? JSON.parse(stored).token : {};
    console.log(token, 'token');

    return this.httpClient.get(`http://localhost:3000/api/user`, {
      headers: { authorization: `token ${token}` },
    });
  }
}

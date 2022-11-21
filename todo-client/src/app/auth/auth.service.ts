import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ILogin, IRegister } from './auth.types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private apiService: ApiService) {}

  login(loginPayload: ILogin) {
    return this.apiService.post('user/login', { user: loginPayload }, true);
  }

  register(registerPayload: IRegister) {
    return this.apiService.post('user/register', registerPayload, true);
  }

  logout() {
    this.apiService.setUser(undefined);
    this.router.navigate(['/auth']);
  }

  validateUser() {
    return this.apiService.get('user');
  }
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { StorageService } from '../services/storage.service';
import { ILogin, IRegister } from './auth.types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private apiService: ApiService, private storageService: StorageService) {}

  login(loginPayload: ILogin) {
    return this.apiService.post('user/login', { user: loginPayload }, true);
  }

  register(registerPayload: IRegister) {
    return this.apiService.post(
      'user/register',
      { user: registerPayload },
      true
    );
  }

  logout() {
    this.storageService.setUser(undefined);
    this.router.navigate(['/auth']);
  }

  validateUser() {
    return this.apiService.get('user');
  }
}

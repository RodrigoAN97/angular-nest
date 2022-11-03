import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';
import { IUserResponse } from './auth/auth.types';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  tokenStarted = false;
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    return this.authService.validateUser().pipe(
      map((response) => {
        const res = response as IUserResponse;
        const authenticated = res.user.token && res.user.id && res.user.email;
        if (authenticated) {
          return true;
        }
        return false;
      })
    );
  }
}

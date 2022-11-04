import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';
import { IUserResponse } from './auth/auth.types';
import { SnackBarService } from './services/snack-bar.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  tokenStarted = false;
  constructor(
    private router: Router,
    private authService: AuthService,
    private snackbarService: SnackBarService
  ) {}

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
        this.notLoggedIn();
        return false;
      }),
      catchError(() => {
        this.notLoggedIn();
        return of(false);
      })
    );
  }

  notLoggedIn() {
    this.router.navigate(['/auth']);
    this.snackbarService.action('TYPE YOUR CREDENTIALS', 'LOGGED OUT');
  }
}

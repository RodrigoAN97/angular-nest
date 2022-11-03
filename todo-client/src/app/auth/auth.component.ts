import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { SnackBarService } from '../services/snack-bar.service';
import { AuthService } from './auth.service';
import { ILoginResponse } from './auth.types';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {
  private destroyed$: Subject<void> = new Subject();
  loginTemplate$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  registerForm = new FormGroup({
    displayName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private authService: AuthService,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {}

  login() {
    const email = this.loginForm.value.email as string;
    const password = this.loginForm.value.password as string;

    this.authService
      .login({ email, password })
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (res) => {
          const response = res as ILoginResponse;
          localStorage.setItem('user', JSON.stringify(response.user));
          this.snackBarService.successSnackBar("You're in!");
        },
        error: (err: HttpErrorResponse) => {
          this.snackBarService.errorSnackBar(err.message);
        },
      });
  }

  register() {
    const email = this.registerForm.value.email as string;
    const password = this.registerForm.value.password as string;
    const displayName = this.registerForm.value.displayName as string;

    this.authService
      .register({ email, password, displayName })
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (res) => {
          const response = res as ILoginResponse;
          localStorage.setItem('user', JSON.stringify(response.user));
          this.snackBarService.successSnackBar("You're in!");
        },
        error: (err: HttpErrorResponse) => {
          this.snackBarService.errorSnackBar(err.message);
        },
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }
}

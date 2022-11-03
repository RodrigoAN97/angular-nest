import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private authService: AuthService) {}
  login() {
    const email = this.loginForm.value.email as string;
    const password = this.loginForm.value.password as string;
    console.log({ email, password });

    this.authService.login({ email, password }).subscribe(x => console.log(x));
  }
}

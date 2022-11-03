import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  login() {
    const email = this.loginForm.value.email as string;
    const password = this.loginForm.value.password as string;
    console.log({ email, password });

    this.authService.login({ email, password }).subscribe(x => console.log(x));
  }
}

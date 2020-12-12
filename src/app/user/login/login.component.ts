import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error: String | undefined;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    const temp = this.userService
      .login(
        this.loginForm.get('email')?.value,
        this.loginForm.get('password')?.value
      )
      .then((x) => {
        if (typeof x === typeof 'string') {
          this.error = x as String;
          this.hideError();
          return;
        }
        this.router.navigateByUrl('/posts/all');
      }).catch(console.log);
  }

  hideError() {
    setTimeout(() => {
      this.error = undefined;
    }, 2500);
  }
}

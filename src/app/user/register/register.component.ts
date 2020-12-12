import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { IRegisterModel } from '../../shared/interfaces/user-register';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitButton: HTMLButtonElement | null = document.querySelector(
    '.submit-btn'
  );
  error: string | undefined;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.registerForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.minLength(6),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      repeatPassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      firstName: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      lastName: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }

  onSubmit(): void {
    this.submitButton?.disabled;
    const pass = this.registerForm.get('password')?.value;
    const rePass = this.registerForm.get('repeatPassword')?.value;
    if (pass !== rePass) {
      this.error = 'Passwords dont match!';
      this.errorHide();
      return;
    }

    this.userService
      .register(
        this.registerForm.get('email')?.value,
        this.registerForm.get('password')?.value,
        this.registerForm.get('firstName')?.value,
        this.registerForm.get('lastName')?.value
      )
      .then((x) => {
        if (x === 'Email is aready taken!') {
          this.error = 'Email is aready taken!';
          this.errorHide();
          return;
        } else {
          this.router.navigateByUrl('/posts/all');
        }
      });
  }

  ngOnInit(): void {}

  errorHide() {
    setTimeout(() => {
      this.error = undefined;
    }, 2500);
  }
}

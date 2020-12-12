import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss'],
})
export class PasswordChangeComponent implements OnInit {
  changePasswordForm: FormGroup;
  error: string | undefined;
  constructor(private userService: UserService) {
    this.error = undefined;
    this.changePasswordForm = new FormGroup({
      currentPassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      newPassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  ngOnInit(): void {}

  async onSubmit() {
    const newP = this.changePasswordForm.get('newPassword')?.value;
    const currP = this.changePasswordForm.get('currentPassword')?.value;
    try {
      const pass = await this.userService.userPassword();
      if (currP !== pass) {
        this.error = 'Wrong Current Password';
        this.errorHide();
        return;
      }else{
        this.userService.updatePass(newP);
      }
    } catch (error) {
      this.error = 'Something went wrong!';
      this.errorHide();
    }
    
  }

  errorHide() {
    setTimeout(() => {
      this.error = undefined;
    }, 2500);
  }
}

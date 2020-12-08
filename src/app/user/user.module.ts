import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserRoutingModule } from './user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { UserService } from './user.service';
import {
  AngularFirestoreModule,
  AngularFirestore,
} from '@angular/fire/firestore';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth.service';
import { NotAuthGuard } from './not-auth.service';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, ProfileComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  exports: [LoginComponent, RegisterComponent],
  providers: [UserService, AuthGuard, NotAuthGuard],
})
export class UserModule {}

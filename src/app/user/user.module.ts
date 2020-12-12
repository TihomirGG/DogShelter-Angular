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
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth.service';
import { NotAuthGuard } from './not-auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PostService } from '../core/post.service';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { DescriptionCutPipe } from '../application-pipe/description-cut.pipe';
import { ApplicationPipeModule } from '../application-pipe/application-pipe.module';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    PasswordChangeComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    ApplicationPipeModule
  ],
  exports: [LoginComponent, RegisterComponent],
  providers: [UserService, AuthGuard, NotAuthGuard, PostService],
})
export class UserModule {}

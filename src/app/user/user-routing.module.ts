import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import {
  AngularFireAuthGuard,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { AuthGuard } from './auth.service';
import { PasswordChangeComponent } from './password-change/password-change.component';

// const redirectLoggedInToPosts = () => redirectLoggedInTo('posts/all');
// const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo('user/login');

const routes: Routes = [
  {
    path: 'user',
    children: [
      {
        path: 'register',
        component: RegisterComponent,
        // data: { authGuardPipe: redirectLoggedInToPosts },
      },
      {
        path: 'login',
        component: LoginComponent,
        // data: { authGuardPipe: redirectLoggedInToPosts },
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
        // data: { authGuardPipe: redirectUnauthorizedToLogin },
      },
      { path: 'changePassword', component: PasswordChangeComponent },
    ],
  },
];

export const UserRoutingModule = RouterModule.forChild(routes);

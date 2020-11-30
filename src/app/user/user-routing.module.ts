import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: 'user',
    children: [
      {
        path: 'register',
        component: RegisterComponent,
        data: { title: 'Register' },
      },
      { path: 'login', component: LoginComponent, data: { title: 'Login' } },
    ],
  },
];

export const UserRoutingModule = RouterModule.forChild(routes);

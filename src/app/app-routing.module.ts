import { NgModule } from '@angular/core';
import {
  AngularFireAuthGuard,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './core/about/about.component';
import { HomeComponent } from './core/home/home.component';
import {NotAuthGuard} from './user/not-auth.service';

// const redirectLoggedInToPosts = () => redirectLoggedInTo('posts/all');
// const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo('user/login');

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [NotAuthGuard]
  },
  { path: 'about', pathMatch: 'full', component: AboutComponent },
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
    canActivate: [NotAuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

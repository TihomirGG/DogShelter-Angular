import {
  redirectLoggedInTo,
  redirectUnauthorizedTo,
  AngularFireAuthGuard,
} from '@angular/fire/auth-guard';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { DetailComponent } from './detail/detail.component';
import { EditComponent } from './edit/edit.component';
import { PostsComponent } from './posts/posts.component';
import {AuthGuard} from '../user/auth.service';
import { NotFoundComponent } from './not-found/not-found.component';

// const redirectLoggedInToPosts = () => redirectLoggedInTo('posts/all');
// const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo('user/login');

const router: Routes = [
  {
    path: 'posts/all',
    pathMatch: 'full',
    component: PostsComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'posts/create',
    pathMatch: 'full',
    component: CreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'posts/details/:id',
    pathMatch: 'full',
    component: DetailComponent,
    canActivate: [AuthGuard],
    
  },
  {
    path: 'posts/edit/:id',
    pathMatch: 'full',
    component: EditComponent,
    canActivate: [AuthGuard],
    
  },
  
];

export const CoreRoutingModule = RouterModule.forChild(router);

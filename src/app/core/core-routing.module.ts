import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { DetailComponent } from './detail/detail.component';
import { EditComponent } from './edit/edit.component';
import { PostsComponent } from './posts/posts.component';

const router: Routes = [
  {
    path: 'posts/all',
    pathMatch: 'full',
    component: PostsComponent,
  },
  { path: 'posts/create', pathMatch: 'full', component: CreateComponent },
  { path: 'posts/details/:id', pathMatch: 'full', component: DetailComponent },
  { path: 'posts/edit/:id', pathMatch: 'full', component: EditComponent },
];

export const CoreRoutingModule = RouterModule.forChild(router);

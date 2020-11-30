import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { FilterComponent } from './filter/filter.component';

const router: Routes = [
  {
    path: 'posts/all',
    pathMatch: 'full',
    component: FilterComponent,
  },
  { path: 'posts/create', pathMatch: 'full', component: CreateComponent },
];

export const CoreRoutingModule = RouterModule.forChild(router);

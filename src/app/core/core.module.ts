import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { FilterComponent } from './filter/filter.component';
import { CreateComponent } from './create/create.component';
import { UserService } from '../user/user.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CoreRoutingModule } from './core-routing.module';
import { PostService } from './post.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PostsComponent } from './posts/posts.component';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DetailComponent } from './detail/detail.component';
import { EditComponent } from './edit/edit.component';
import { AboutComponent } from './about/about.component';
import { NotAuthGuard } from '../user/not-auth.service';
import { AuthGuard } from '../user/auth.service';
import { ApplicationPipeModule } from '../application-pipe/application-pipe.module';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    HomeComponent,
    FilterComponent,
    CreateComponent,
    PostsComponent,
    DetailComponent,
    EditComponent,
    AboutComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatSelectModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    ApplicationPipeModule
  ],
  exports: [HomeComponent, CreateComponent, CreateComponent, PostsComponent,NotFoundComponent],
  providers: [PostService,NotAuthGuard,AuthGuard],
})
export class CoreModule {}

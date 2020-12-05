import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { IPost } from '../../shared/interfaces/posts';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit, OnDestroy {
  posts: IPost[] | null;
  isLoading: Boolean;

  constructor(private postService: PostService) {
    this.posts = null;

    console.log(this.postService.getAll());
    this.isLoading = true;
  }

  ngOnInit(): void {
    this.postService.getAll().then((x) => {
      this.posts = x;
      this.isLoading = false;
    });
  }

  ngOnDestroy() {}
}

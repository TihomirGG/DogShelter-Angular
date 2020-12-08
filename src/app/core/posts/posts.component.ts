import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { IPost } from '../../shared/interfaces/posts';
import { Observable } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit, OnDestroy {
  posts: IPost[];
  isLoading: Boolean;
  length: number;
  pageSlice: IPost[];

  constructor(private postService: PostService) {
    this.posts = [];
    this.pageSlice = [];
    this.length = 0;
    console.log(this.postService.getAll());
    this.isLoading = true;
  }

  ngOnInit(): void {
    this.postService.getAll().then((x) => {
      this.posts = x;
      this.pageSlice =
        this.posts.length <= 12 ? this.posts : this.posts.slice(0, 12);
      this.length = this.posts.length;
      this.isLoading = false;
    });
  }

  ngOnDestroy() {}

  onPageEvent(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.posts.length) {
      endIndex = this.posts.length;
    }

    this.pageSlice = this.posts.slice(startIndex, endIndex);
  }
}

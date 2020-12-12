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
  error: string | undefined;
  sub: any;

  constructor(private postService: PostService) {
    this.posts = [];
    this.pageSlice = [];
    this.length = 0;
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
    this.sub = this.postService.postEmmiter.subscribe((x: IPost[] | null) => {
      if (x?.length) {
        this.posts = x;
        this.pageSlice =
          this.posts.length <= 12 ? this.posts : this.posts.slice(0, 12);
        this.length = this.posts.length;
      } else {
        this.error = 'Didnt find anything!';
        this.errorHide();
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onPageEvent(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.posts.length) {
      endIndex = this.posts.length;
    }

    this.pageSlice = this.posts.slice(startIndex, endIndex);
  }

  errorHide() {
    setTimeout(() => {
      this.error = undefined;
    }, 2500);
  }
}

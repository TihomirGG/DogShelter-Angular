import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/core/post.service';
import { IPost } from 'src/app/shared/interfaces/posts';
import { PageEvent } from '@angular/material/paginator';
import { UserService } from '../user.service';
import { IUser } from 'src/app/shared/interfaces/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  posts: IPost[];
  isLoading: Boolean;
  length: number;
  pageSlice: IPost[];
  user: IUser | undefined;
  constructor(
    private postService: PostService,
    private userService: UserService
  ) {
    this.posts = [];
    this.isLoading = true;
    this.length = 0;
    this.pageSlice = [];
  }

  ngOnInit(): void {
    Promise.all([
      this.userService.getUserCurrentUserInfo(),
      this.postService.getUserPosts(),
    ]).then((temp) => {
      const user = temp[0];
      const post = temp[1];
      this.user = user as IUser;
      this.posts = post as IPost[];
      this.pageSlice =
        this.posts.length <= 6 ? this.posts : this.posts.slice(0, 6);
      this.length = this.posts.length;
      this.isLoading = false;
    });
   
  }
  onPageEvent(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.posts.length) {
      endIndex = this.posts.length;
    }

    this.pageSlice = this.posts.slice(startIndex, endIndex);
  }
}

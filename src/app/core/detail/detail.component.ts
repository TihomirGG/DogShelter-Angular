import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';
import { IPost } from '../../shared/interfaces/posts';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  postId: string;
  post: IPost | null;
  isLoading: Boolean;
  currentUserId: string | undefined;
  constructor(
    private router: ActivatedRoute,
    private postService: PostService,
    private userService: UserService
  ) {
    this.isLoading = true;
    this.postId = '';
    this.post = null;
  }

  ngOnInit(): void {
    console.log(this.userService.userId);
    this.currentUserId = this.userService.userId;
    this.postId = this.router.snapshot.params.id;
    this.postService.getById(this.postId).then((x) => {
      this.isLoading = false;
      this.post = x;
    });
  }

  edit() {}

  deletePost() {
    this.postService.deletePost(this.postId);
  }
}

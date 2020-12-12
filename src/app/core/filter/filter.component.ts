import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PostService } from '../post.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  searchForm: FormGroup;
  constructor(private postService: PostService) {
    this.searchForm = new FormGroup({
      search: new FormControl(null),
      region: new FormControl(null),
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    const search = this.searchForm.get('search')?.value;
    console.log(this.searchForm.get('region')?.value);
    const region = this.searchForm.get('region')?.value;

    this.postService.regionFilterPosts(search, region);
  }
}

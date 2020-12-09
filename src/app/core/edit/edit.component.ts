import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IPost } from 'src/app/shared/interfaces/posts';
import { PostService } from '../post.service';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  editForm: FormGroup;
  file: File | undefined;
  postId: string ;
  post: IPost | null;
  isLoading: Boolean;
  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private router: ActivatedRoute
  ) {
    this.isLoading = true;
    this.postId = '';
    this.file = undefined;
    this.post = null;
    this.editForm = new FormGroup({
      region: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(150),
      ]),
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      city: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
      ]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/(08)(\d{8})/),
      ]),
      image: new FormControl(null, []),
    });
  }


  ngOnInit(): void {
    this.postId = this.router.snapshot.params.id
    this.postService.getById(this.postId).then(x=> {
      console.log(x);
      this.editForm.get('title')?.setValue(x.title);
      this.editForm.get('city')?.setValue(x.city);
      this.editForm.get('phone')?.setValue(x.phone);
      this.editForm.get('description')?.setValue(x.description);
      this.editForm.get('region')?.setValue(x.region);
      this.isLoading= false;
    });

  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.file = file;
    }
  }

  changeCity(e : any) {
    this.editForm.get('get')?.setValue(e.target.value, {
      onlySelf: true
    })
  }


  onSubmit() : void {
    const region = this.editForm.get('region')?.value;
    const description = this.editForm.get('description')?.value;
    const phone = this.editForm.get('phone')?.value;
    const title = this.editForm.get('title')?.value;
    const city = this.editForm.get('city')?.value;
    this.postService.updatePost(this.postId,title,city,region,phone,description,this.file)
  }

}

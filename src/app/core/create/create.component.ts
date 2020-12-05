import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PostService } from '../post.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  createForm: FormGroup;
  file: File | null;
  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService
  ) {
    this.file = null;
    this.createForm = new FormGroup({
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
      image: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {}

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.file = file;
    }
  }

  onSubmit() : void {
    const region = this.createForm.get('region')?.value;
    const description = this.createForm.get('description')?.value;
    const phone = this.createForm.get('phone')?.value;
    const title = this.createForm.get('title')?.value;
    console.log(
      `${region}    ${description}  ${phone}  ${title}  ${this.file}`
    );
    this.postService.create(region, description, phone, title,this.file);
  }
}

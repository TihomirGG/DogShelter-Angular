import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent  {
  
  slides = [{'image': 'https://p7.hiclipart.com/preview/630/131/690/dog-coyote-drawing-clip-art-wolf.jpg'},
{'image':'https://image.shutterstock.com/image-photo/white-transparent-leaf-on-mirror-600w-1029171697.jpg'},
{'image':'https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg'}];
  constructor() {
    
  }

}

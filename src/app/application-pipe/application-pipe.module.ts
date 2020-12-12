import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DescriptionCutPipe } from './description-cut.pipe';

@NgModule({
  declarations: [DescriptionCutPipe],
  imports: [CommonModule,],
  exports: [DescriptionCutPipe],
})
export class ApplicationPipeModule {}

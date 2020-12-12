import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'descriptionCut',
})
export class DescriptionCutPipe implements PipeTransform {
  transform(value: string): string {
    if (value.length > 45) {
      return value.substring(0, 45) + '...';
    }
    return value;
  }
}

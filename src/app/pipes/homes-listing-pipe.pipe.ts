import { Pipe, PipeTransform } from '@angular/core';
import { Home } from '../models/home';

@Pipe({
  name: 'homesListingPipe'
})
export class HomesListingPipePipe implements PipeTransform {

  transform(value: Home[], filterString: string): Home[] {
    if (!filterString)
      return value;

    const filter = filterString.toLowerCase();

    return value.filter(val =>
      val.city && val.city.toLowerCase().includes(filter) ||
      (val.title && val.title.toLowerCase().includes(filter)) ||
      (val.description && val.description.toLowerCase().includes(filter))
    );
  }

}

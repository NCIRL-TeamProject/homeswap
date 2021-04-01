import { Pipe, PipeTransform } from '@angular/core';
import { Home } from './Models/home';

@Pipe({
  name: 'homesListingPipe'
})
export class HomesListingPipePipe implements PipeTransform {

  transform(value: Home[], city: string): Home[] {
    if (!city)
      return value;

    return value.filter(val => val.city && val.city.toLowerCase().includes(city.toLowerCase()));
  }

}

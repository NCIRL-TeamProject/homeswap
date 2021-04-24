import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeocodeService {
  private geocoder: any;

  constructor() { }

  geocodeAddress(location: string): Observable<any> {
    if (!this.geocoder) {
      this.geocoder = new google.maps.Geocoder();
    }

    return new Observable((observer) => {
      this.geocoder.geocode({ address: location, 'componentRestrictions': { 'country': 'IE' } }, (results, status) => {
        if (status === 'OK') {
          const lat = results[0].geometry.location.lat();
          const lng = results[0].geometry.location.lng();

          observer.next({
            lat: lat,
            lng: lng
          });
        } else {
          observer.error('Location could not be geocoded');
        }
      });
    });
  }
}
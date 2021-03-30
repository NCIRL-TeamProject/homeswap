import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class GeocodeService {
  private geocoder: any;

  constructor() { }

  geocodeAddress(location: string): Observable<any> {
    if (!this.geocoder) {
      console.log('Init geocoder');
      this.geocoder = new google.maps.Geocoder();
    }

    return new Observable((observer) => {
      console.log('Start geocoding');
      this.geocoder.geocode({ address: location, 'componentRestrictions': { 'country': 'IE' } }, (results, status) => {
        if (status === 'OK') {
          console.log('Geocoding complete for location: ' + location);
          const lat = results[0].geometry.location.lat();
          const lng = results[0].geometry.location.lng();

          console.log('lat: ' + lat);
          console.log('lng: ' + lng);
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
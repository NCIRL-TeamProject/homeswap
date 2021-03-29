import { MapsAPILoader } from '@agm/core';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class GeocodeService {
  private geocoder: any;

  constructor(private mapLoader: MapsAPILoader) { }

  private initGeocoder() {
    console.log('Init geocoder!');
    this.geocoder = new google.maps.Geocoder();
  }

  private waitForMapsToLoad(): Observable<boolean> {
    if (!this.geocoder) {
      this.mapLoader.load().then(() => {
        this.initGeocoder();

        return true;
      })
    }

    return of(true);
  }

  geocodeAddress(location: string): Observable<any> {
    console.log('Start geocoding!');
    return this.waitForMapsToLoad().pipe(
      // filter(loaded => loaded),
      switchMap(() => {
        return new Observable(observer => {
          this.geocoder?.geocode({ 'address': location, 'componentRestrictions': { 'country': 'IE' } }, (results: { geometry: { location: { lat: () => any, lng: () => any; }; }; }[], status: any) => {
            if (status == google.maps.GeocoderStatus.OK) {
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
              console.log('Error - ', results, ' & Status - ', status);
              observer.next({ lat: 0, lng: 0 });
            }
            observer.complete();
          });
        })
      })
    )
  }

}
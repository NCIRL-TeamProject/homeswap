import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Home } from '../Models/home';

@Injectable({
  providedIn: 'root'
})
export class HomeProfileService {

  constructor(private httpClient: HttpClient) { }

  get(userId: any): Observable<Home> {
    const params = new HttpParams().set('userId', userId);
    return this.httpClient.get<Home>('api/homeprofile', { params })
      .pipe(map((x) => {
        const home = new Home(x);
        return home;
      }));
  }

  save(home: Home): Observable<any> {
    var formData: any = new FormData();
    formData.append("title", home.title);
    formData.append("description", home.description);
    formData.append("userId", home.userId);
    formData.append("image", home.image);
    formData.append("bedrooms", home.bedrooms);
    formData.append("bathrooms", home.bathrooms);
    formData.append("streetAddress", home.streetAddress);
    formData.append("city", home.city);
    formData.append("postCode", home.postCode);

    return this.httpClient.post('api/homeprofile', formData);
  }
}

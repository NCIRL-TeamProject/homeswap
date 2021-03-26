import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Home } from '../Models/home';

@Injectable({
  providedIn: 'root'
})
export class HomeProfileService {

  constructor(private httpClient: HttpClient) { }

  get(userId: any): Observable<any> {
    const params = new HttpParams().set('userId', userId);
    return this.httpClient.get('api/homeprofile', { params });
  }

  save(home: Home): Observable<any> {
    var formData: any = new FormData();
    formData.append("title", home.title);
    formData.append("description", home.description);
    formData.append("userId", home.userId);
    formData.append("image", home.image);
    formData.append("streetAddress", home.streetAddress);
    formData.append("city", home.city);
    formData.append("country", home.country);
    formData.append("postCode", home.postCode);
    return this.httpClient.post('api/homeprofile', formData);
  }
}

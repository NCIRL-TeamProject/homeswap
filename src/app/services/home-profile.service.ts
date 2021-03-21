import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeProfileService {

  constructor(private httpClient: HttpClient) { }


  get(userId: any): Observable<any> {
    const params = new HttpParams().set('userId', userId);
    return this.httpClient.get('api/homeprofile', { params });
  }

  save(title: any, description: any, userId: any, image: any): Observable<any> {
    var formData: any = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("userId", userId);
    formData.append("image", image);
    return this.httpClient.post('api/homeprofile', formData);
  }
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Home } from '../Models/home';

@Injectable({
  providedIn: 'root'
})
export class HomesForSwapServiceService {

  constructor(private httpClient: HttpClient) { }

  getHomesForSwapping(place: string | undefined): Observable<Home[]> {
    let params = new HttpParams();

    if (place)
      params = new HttpParams().set('place', place);

    return this.httpClient.get<Home[]>('api/getHomesForSwapping', { params: params });
  }

  getHomeDetails(id: string): Observable<Home> {
    const params = new HttpParams().set('id', id);
    return this.httpClient.get<Home>('api/getHomeDetails', { params }).pipe(map((x) => {
      const home = new Home(x);
      return home;
    }));
  }
}
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Home } from '../Models/home';

@Injectable({
  providedIn: 'root'
})
export class HomesForSwapServiceService {

  constructor(private httpClient: HttpClient) { }

  getHomesForSwapping(): Observable<Home[]> {
    return this.httpClient.get<Home[]>('api/getHomesForSwapping');
  }

  getHomeDetails(id: string): Observable<Home> {
    const params = new HttpParams().set('id', id);
    return this.httpClient.get<Home>('api/getHomeDetails', { params });
  }
}
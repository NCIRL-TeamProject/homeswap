import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Home } from '../Models/home';
import { HomeSwapRequest } from '../Models/homeSwapRequest';

@Injectable({
  providedIn: 'root'
})
export class HomesForSwapServiceService {

  constructor(private httpClient: HttpClient) { }

  getHomesForSwapping(place: string | undefined, userId: string | undefined): Observable<Home[]> {
    let params = new HttpParams();

    if (userId)
      params = params.append('userId', userId);

    if (place)
      params = params.append('place', place);

    return this.httpClient.get<Home[]>('api/getHomesForSwapping', { params: params });
  }

  getHomeDetails(id: string): Observable<Home> {
    const params = new HttpParams().set('id', id);
    return this.httpClient.get<Home>('api/getHomeDetails', { params }).pipe(map((x) => {
      const home = new Home(x);
      return home;
    }));
  }

  validateHomeIsPublished(userId: string): Observable<Home> {
    const params = new HttpParams().set('userId', userId);
    return this.httpClient.get<Home>('api/validateHomeIsPublished', { params })
  }

  requestHomeSwap(checkin: Date, checkout: Date, homeIdTo: number, userIdFrom: number): Observable<any> {
    var body = {
      checkin: checkin,
      checkout: checkout,
      homeIdTo: homeIdTo,
      userIdFrom: userIdFrom
    };

    return this.httpClient.post<any>('api/requestHomeSwap', body);
  }

  getReceivedRequests(userId: string): Observable<HomeSwapRequest[]> {
    const params = new HttpParams().set('userId', userId);
    return this.httpClient.get<HomeSwapRequest[]>('api/receivedRequests', { params });
  }

  getSentRequests(userId: string): Observable<HomeSwapRequest[]> {
    const params = new HttpParams().set('userId', userId);
    return this.httpClient.get<HomeSwapRequest[]>('api/sentRequests', { params });
  }
}
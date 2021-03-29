import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../Models/user';

//example from here: https://www.techiediaries.com/angular-9-8-mean-stack-authentication-tutorial-and-example-with-node-and-mongodb/
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private httpClient: HttpClient, private router: Router, private jwtHelper: JwtHelperService) { }

  register(user: User): Observable<any> {
    return this.httpClient.post('api/auth/signup', user).pipe(
      catchError((err) => { console.log(err); return this.handleError; }));
  }

  login(email: string, password: string) {
    return this.httpClient.post<any>('api/auth/signin', { email, password })
      .pipe(map(res => {
        localStorage.setItem('access_token', res.accessToken);
        localStorage.setItem('user_id', res.id);
        console.log('user logged-in: ' + res.username);
        return res;
      }))
  }

  logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_id");
    this.router.navigate(['/home']);
  }

  public isLoggedIn() {
    const token = this.getAccessToken();

    return !this.jwtHelper.isTokenExpired(token);
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getAccessToken(): string {
    return localStorage.getItem('access_token');
  }

  getLoggedInUserId(): any {
    return this.isLoggedIn() ? localStorage.getItem('user_id') : null;
  }

  getUserBasicProfile(id): Observable<Response> {
    return this.httpClient.get(`api/users/profile/${id}`
    ).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse): Observable<any> {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}

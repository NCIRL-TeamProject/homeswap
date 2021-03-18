import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { User } from '../registration/_models/user';
import { error } from '@angular/compiler/src/util';

//example from here: https://www.techiediaries.com/angular-9-8-mean-stack-authentication-tutorial-and-example-with-node-and-mongodb/
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  //API_URL = 'http://localhost:8080';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(private httpClient: HttpClient, public router: Router){}

  register(user: User): Observable<any> {
   return this.httpClient.post('api/auth/signup', user).pipe(
      catchError((err) => {console.log(err); return  this.handleError; }));
  }

  // login(user: User) {
  //   return this.httpClient.post<any>('/users/login', user)
  //     .subscribe((res: any) => {
  //       localStorage.setItem('access_token', res.token)
  //       this.getUserProfile(res._id).subscribe((res) => {
  //         this.currentUser = res;
  //         this.router.navigate(['users/profile/' + res.msg._id]);
  //       })
  //     })
  // }

  getAccessToken(): string {
     return localStorage.getItem('access_token');
   }

   get isLoggedIn(): boolean {
     const authToken = localStorage.getItem('access_token');
     return (authToken !== null) ? true : false;
  }

  // logout() {
  //   if (localStorage.removeItem('access_token') == null) {
  //     this.router.navigate(['users/login']);
  //   }
  // }

  // getUserProfile(id): Observable<any> {
  //   return this.httpClient.get(`${this.API_URL}/users/profile/${id}`, { headers: this.headers }).pipe(
  //     map((res: Response) => {
  //       return res || {}
  //     }),
  //     catchError(this.handleError)
  //   )
  // }

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

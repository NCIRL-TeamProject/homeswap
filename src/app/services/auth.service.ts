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
  //API_URL = 'http://localhost:8080';
  //headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};
  userId;
  constructor(private httpClient: HttpClient, private router: Router, private jwtHelper: JwtHelperService) { }

  register(user: User): Observable<any> {
    return this.httpClient.post('api/auth/signup', user).pipe(
      catchError((err) => { console.log(err); return this.handleError; }));
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

  login(email: string, password: string) {
    return this.httpClient.post<User>('api/auth/signin', { email, password })
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.accessToken);
        console.log('user logged-in: ' + res.username);
        this.userId = res.id;
        //For simplicity I am just assigning the data from token
        this.currentUser = { id: res.id, username: res.username, email: res.email };
        this.router.navigateByUrl('/');
      });
  }

  logout() {
    localStorage.removeItem("access_token");
    this.userId = null;
    this.currentUser = null;
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

  getUserProfile(id): Observable<any> {
    return this.httpClient.get('users/profile/${id}'
      // , { headers: this.headers }
    ).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
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

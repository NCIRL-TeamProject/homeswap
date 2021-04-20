import { Injectable } from '@angular/core';

import { NavigationExtras, Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private httpClient: HttpClient, private router: Router, private jwtHelper: JwtHelperService) { }

  loggedInUser$ = new BehaviorSubject<User>(undefined);

  getLoggedInUser(): Observable<User> {
    return this.loggedInUser$.asObservable();
  }

  setLoggedInUser(loggedInUser: User) {
    this.loggedInUser$.next(loggedInUser);
  }

  register(user: User): Observable<any> {
    return this.httpClient.post('api/auth/signup', user).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.handleError));
  }

  login(email: string, password: string) {
    return this.httpClient.post<any>('api/auth/signin', { email, password })
      .pipe(map(res => {
        localStorage.setItem('access_token', res.accessToken);
        localStorage.setItem('user_id', res.id);
        localStorage.setItem('email', email);
        localStorage.setItem('profileImage', res.profileImage);

        var user = new User();
        user.firstName = res.firstName;
        user.lastName = res.lastName;
        user.dbo = res.dbo;
        user.email = res.email;
        user.profileImage = res.profileImage;

        this.setLoggedInUser(user);

        return res;
      }));
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('email');
    localStorage.setItremoveItemem('profileImage');

    this.setLoggedInUser(undefined);
    this.router.navigate(['/home']);
  }

  public isLoggedIn(): boolean {
    const token = this.getAccessToken();

    return !this.jwtHelper.isTokenExpired(token);
  }

  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  getAccessToken(): string {
    return localStorage.getItem('access_token');
  }

  getLoggedInUserId(): string {
    return this.isLoggedIn() ? localStorage.getItem('user_id') : null;
  }

  getLoggedInUserEmail(): string {
    return this.isLoggedIn() ? localStorage.getItem('email') : null;
  }

  getLoggedInUserProfile(): string {
    return this.isLoggedIn() ? localStorage.getItem('profileImage') : null;
  }

  getUserBasicProfile(id): Observable<User> {
    return this.httpClient.get<User>(`api/users/profile/${id}`);
  }

  // getLoggedInUser(): Observable<User> {
  //   const userId = this.getLoggedInUserId();

  //   if (!userId) return;
  //   return this.httpClient.get<User>(`api/users/profile/${userId}`);
  // }

  removeAccount(user: User, id: string): Observable<any> {
    return this.httpClient.post(`api/user/delete/${id}`, user).pipe(
      map((res: Response) => {
        this.clearRemovedUserDetails(res);
        return res;
      }),
      catchError((err) => { console.log(err); return this.handleError; }));
  }

  private clearRemovedUserDetails(res: any): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('email');
    const navigationExtras: NavigationExtras = { state: { data: res } };
    this.router.navigate(['/register'], navigationExtras);
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

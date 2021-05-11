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

  getLogedIUser(): Observable<any> {
    const userId = this.getLoggedInUserId();
    if (!userId) return undefined;

    return this.getUserBasicProfile(userId);
  }

  getLoggedInUserProfile(): string {
    return this.isLoggedIn() ? localStorage.getItem('profileImage') : null;
  }

  getLoggedInUserChange(): Observable<User> {
    return this.loggedInUser$.asObservable();
  }

  setLoggedInUserChange(loggedInUser: User) {
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

        if (res.profileImage)
          localStorage.setItem('profileImage', res.profileImage);

        var user = new User();
        user.id = res.id;
        user.firstName = res.firstName;
        user.lastName = res.lastName;
        user.dbo = res.dbo;
        user.email = res.email;
        user.profileImage = res.profileImage;

        this.setLoggedInUserChange(user);

        return res;
      }));
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('email');
    localStorage.removeItem('profileImage');

    this.setLoggedInUserChange(undefined);
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

  getUserBasicProfile(id): Observable<Response> {
    return this.httpClient.get(`api/users/profile/${id}`
    ).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError((err) => this.handleError(err))
    );
  }

  // refactor this to be delete
  removeAccount(user: User, id: string): Observable<any> {
    return this.httpClient.post(`api/user/delete/${id}`, user).pipe(
      map((res: Response) => {
        this.clearRemovedUserDetails(res);
        return res;
      }),
      catchError((err) => { console.log(err); return this.handleError(err); }));
  }

  updateAccount(user: User, id: string): Observable<any> {
    return this.httpClient.put(`api/user/update/${id}`, user).pipe(
      map((res: Response) => {
        return res;
      }),
      catchError((err) => { console.log(err); return this.handleError(err); }));
  }

  updatePassword(user: User, id: string): Observable<any> {
    return this.httpClient.put(`api/user/update/password/${id}`, user).pipe(
      map((res: Response) => {
        return res;
      }),
      catchError((err) => { console.log(err); return this.handleError(err); }));
  }

  updateProfilePicture(user: User, id: string): Observable<any> {
    const formData: any = new FormData();
    formData.append('profileImage', user.profileImage);
    return this.httpClient.put(`api/user/update/picture/${id}`, formData).pipe(
      map((res: Response) => {
        return res;
      }), catchError((err) => this.handleError(err)));
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
      // for testing: msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
      msg = `Error Code: ${error.status}\nMessage: ${error.error.message}`;
    }
    return throwError(msg);
  }
}

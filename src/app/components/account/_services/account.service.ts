import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/Models/user';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  subscription: any;
  private statusMessage: any;
  constructor(private authService: AuthService, private router: Router) { }

  public validatesUserIsLoggedIn(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['login']);
    }
  }

  public getUserId(): string {
    let userId: string = null;
    userId = this.authService.getLoggedInUserId();
    return userId;
  }

  public getUserDetails(id: any): Observable<User> {
    const userDetails = new User();
    return this.getUserById(id).pipe(
      map((res: Response) => {
        userDetails.firstName = res['firstName'];
        userDetails.lastName = res['lastName'];
        userDetails.email = res['email'];
        userDetails.dbo = res['dbo'];
        userDetails.profileImage = res['profileImage'];
        return userDetails;
      }));
  }

  private getUserById(id: any): Observable<any> {
    return this.authService.getUserBasicProfile(id);
  }

  public updateUser(user: User, userId: string): Observable<any> {
    return this.authService.updateAccount(user, userId).pipe(map((res) => res));
  }

  public updatePassword(user: User, userId: string): Observable<any> {
    return this.authService.updatePassword(user, userId).pipe(map((res) => res));
  }


  public updateProfilePicture(user: User, userId: string): Observable<any> {
    return this.authService.updateProfilePicture(user, userId).pipe(
      map((res) => res
      ));
  }

  public isInvalidInput(fieldName: string, form: FormGroup): boolean {
    return form.controls[fieldName].invalid &&
      (form.controls[fieldName].dirty || form.controls[fieldName].touched);
  }

}

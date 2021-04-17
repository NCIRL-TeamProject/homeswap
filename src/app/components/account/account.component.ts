import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  userDetails: User;
  private subscription: Subscription;

  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit(): void {
    this.populateUserDetails();
  }

  populateUserDetails(): void {
    this.userDetails = new User();
    const userId: any = this.getUserLoggedId();
    if (userId != null) {
      this.getUserDetails(userId);
    }
    else {
      // session expired
      this.router.navigate(['login']);
    }
  }

  private getUserLoggedId(): string {
    let userId: string = null;
    userId = this.authService.getLoggedInUserId();
    return userId;
  }

  private getUserDetails(id: any) {
    this.authService.getUserBasicProfile(id).subscribe((user) => {
      this.userDetails.firstName = user.firstName;
      this.userDetails.lastName = user.lastName;
      this.userDetails.email = user.email;
      this.userDetails.dbo = user.dbo;
      return user;
    });
  }
}

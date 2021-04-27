import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  userDetails: User;

  constructor(private router: Router, private accountService: AccountService,
              ) { }

  ngOnInit(): void {
    this.populateUserDetails();
  }

  populateUserDetails(): void {
    this.userDetails = new User();
    const userId: any = this.accountService.getUserId();
    if (userId != null) {
      this.getUserDetails(userId);
    }
    else {
      // session expired
      this.router.navigate(['login']);
    }
  }

  public getProfileImage(): string {
    return this.accountService.getProfileImage(this.userDetails.profileImage);
  }

  private getUserDetails(userId: string): void {
    this.userDetails = new User();
    if (userId != null) {
      this.accountService.getUserDetails(userId).subscribe(user => {
      this.userDetails.email = user.email;
      this.userDetails.dbo = user.dbo;
      this.userDetails.firstName = user.firstName;
      this.userDetails.lastName = user.lastName;
      this.userDetails.profileImage = user.profileImage;
      });
    }
    else {
      // session expired
      this.router.navigate(['login']);
    }
  }
}

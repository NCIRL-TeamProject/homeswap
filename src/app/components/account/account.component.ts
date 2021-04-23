import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user';
import { AccountService } from './_services/account.service';
import { NgbCalendar, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  userDetails: User;

  constructor(private router: Router, private accountService: AccountService,
              private ngbCalendar: NgbCalendar, private dateAdapter: NgbDateAdapter<string>,
              private customDateParserFormatter: NgbDateParserFormatter) { }

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

  // needed for ngdatepicker
  get today(): string {
    return this.dateAdapter.toModel(this.ngbCalendar.getToday());
  }

  private getUserDetails(userId: string): void {
    this.userDetails = new User();
    if (userId != null) {
      this.accountService.getUserDetails(userId).subscribe(user => {
      const formattedDate = this.customDateParserFormatter.parse(user.dbo);
      this.userDetails.email = user.email;
      this.userDetails.dbo = this.customDateParserFormatter.format(formattedDate);
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

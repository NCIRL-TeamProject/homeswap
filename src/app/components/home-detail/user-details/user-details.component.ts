import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/Models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  @Input() userId;
  user: User;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getUserBasicProfile(this.userId).subscribe(user => {
      this.user = user;
    })
  }

}
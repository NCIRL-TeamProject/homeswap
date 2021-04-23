import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { User } from 'src/app/Models/user';
import { AuthService } from 'src/app/services/auth.service';
import { NotAvailableImageService } from 'src/app/services/not-available-image.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  @Input() userId;
  user: User;
  constructor(private authService: AuthService, public notAvailableImage: NotAvailableImageService) { }

  ngOnInit(): void {
    this.authService.getUserBasicProfile(this.userId).pipe(
      map((res: Response) => {
        this.user.firstName = res['firstName'];
        this.user.lastName = res['lastName'];
        this.user.email = res['email'];
        this.user.dbo = res['dbo'];
        return this.user;
      })).toPromise();
  }

}

import { ChangeDetectorRef, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { User } from 'src/app/Models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-profile-image',
  templateUrl: './user-profile-image.component.html',
  styleUrls: ['./user-profile-image.component.css']
})
export class UserProfileImageComponent implements OnInit {


  @Input()
  userId: number | undefined;
  loggedInUser: User | undefined;

  constructor(public authService: AuthService, private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadUser(this.userId);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const userId = changes["userId"];

    this.loadUser(userId?.currentValue);
  }

  loadUser(userId: number | undefined): void {
    if (!userId) {
      this.loggedInUser = undefined;
      this.ref.detectChanges();
      return;
    }

    this.authService.getUserBasicProfile(userId).subscribe(res => {
      const user = new User();

      user.firstName = res['firstName'];
      user.lastName = res['lastName'];
      user.email = res['email'];
      user.dbo = res['dbo'];
      user.profileImage = res['profileImage'];

      this.loggedInUser = user;
      this.ref.detectChanges();
    });

  }
}

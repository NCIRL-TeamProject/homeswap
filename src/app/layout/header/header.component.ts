import { Component, OnInit, ChangeDetectionStrategy, HostListener, ChangeDetectorRef } from '@angular/core';
import { User } from 'src/app/Models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  loggedInUserId: number | undefined;
  isMenuCollapsed = true;
  mobile = false;
  innerWidth;
  showIcon = false;

  constructor(public authService: AuthService, private ref: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.setMobile(window.innerWidth);
    const id = parseInt(this.authService.getLoggedInUserId());

    this.authService.getUserBasicProfile(id).subscribe(res => {
      this.loggedInUserId = res['id'];
      this.showIcon = !this.loggedInUserId || (this.loggedInUserId && !res['profileImage']);
      this.ref.detectChanges();
    });

    this.authService.getLoggedInUserChange().subscribe(user => {
      this.loggedInUserId = user?.id;
      this.showIcon = !this.loggedInUserId || (this.loggedInUserId && !user.profileImage);
      this.ref.detectChanges();
    });
  }

  logout() {
    this.authService.logout();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setMobile(window.innerWidth);
  }

  setMobile(width: any) {
    this.mobile = width <= 1000;
  }
}

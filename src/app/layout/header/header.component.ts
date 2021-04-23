import { Component, OnInit, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  loggedInUser;
  isMenuCollapsed = true;
  mobile = false;
  innerWidth;

  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
    this.setMobile(window.innerWidth);

    this.authService.getLoggedInUser().subscribe(user => {
      this.loggedInUser = user;;
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

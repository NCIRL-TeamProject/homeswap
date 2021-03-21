import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService) {

  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
  }
}

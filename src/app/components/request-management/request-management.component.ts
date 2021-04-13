import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Home } from 'src/app/Models/home';
import { HomeSwapRequest } from 'src/app/Models/HomeSwapRequest';
import { AuthService } from 'src/app/services/auth.service';
import { HomesForSwapServiceService } from 'src/app/services/homes-for-swap-service.service';
import { faBed, faBath } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-request-management',
  templateUrl: './request-management.component.html',
  styleUrls: ['./request-management.component.css']
})
export class RequestManagementComponent implements OnInit {
  home: Home;
  faBed = faBed;
  faBath = faBath;
  receivedRequests$: Observable<HomeSwapRequest[]>;
  sentRequests$: Observable<HomeSwapRequest[]>;
  constructor(private service: HomesForSwapServiceService, private authService: AuthService) { }

  ngOnInit(): void {
    this.receivedRequests$ = this.service.getReceivedRequests(this.authService.getLoggedInUserId());
    this.sentRequests$ = this.service.getSentRequests(this.authService.getLoggedInUserId());
  }

  receivedRequestSelected(event: any) {
    console.log(event)
    console.log(event.option.value)
    this.service.getHomeDetails(event.option.value.fromHomeId).subscribe((data: Home) => {
      this.home = data;
    });
  }

  sentRequestSelected(event: any) {
    console.log(event)
    console.log(event.option.value)
    this.service.getHomeDetails(event.option.value.toHomeId).subscribe((data: Home) => {
      this.home = data;
    });
  }
}

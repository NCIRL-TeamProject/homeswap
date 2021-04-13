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
  toHomeId;
  fromHomeId;
  receivedRequests: HomeSwapRequest[];
  sentRequests: HomeSwapRequest[];

  constructor(private service: HomesForSwapServiceService, private authService: AuthService) { }

  ngOnInit(): void {
    this.service.getSentRequests(this.authService.getLoggedInUserId()).subscribe(requests => {
      this.sentRequests = requests;
      if (requests.length > 0) {
        this.toHomeId = requests[0].toHomeId;
      }
    })

    this.service.getReceivedRequests(this.authService.getLoggedInUserId()).subscribe((requests) => {
      this.receivedRequests = requests;

      if (requests.length > 0) {
        this.fromHomeId = requests[0].fromHomeId;
        this.setHomeDetailsFor(requests[0].fromHomeId.toString());
      }
    })
  }

  receivedRequestSelectionChange(event: any) {
    this.fromHomeId = event.option.value.fromHomeId;
    this.setHomeDetailsFor(event.option.value.fromHomeId);
  }

  sentRequestSelectionChange(event: any) {
    this.toHomeId = event.option.value.toHomeId;
    this.setHomeDetailsFor(event.option.value.toHomeId);
  }

  tabChanged(event: any) {
    if (event.index == 1 && this.sentRequests.length > 0) {
      //Requests sent tab     
      this.setHomeDetailsFor(this.toHomeId);
    } else if (event.index == 0 && this.receivedRequests.length > 0) {
      //Requests received tab
      this.setHomeDetailsFor(this.fromHomeId);
    }
  }

  private setHomeDetailsFor(homeId: any) {
    this.service.getHomeDetails(homeId).subscribe((data: Home) => {
      this.home = data;
    });
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { Home } from 'src/app/Models/home';
import { AuthService } from 'src/app/services/auth.service';
import { HomesForSwapServiceService } from 'src/app/services/homes-for-swap-service.service';
import { faBed, faBath } from '@fortawesome/free-solid-svg-icons';
import { HomeSwapRequest } from 'src/app/Models/homeSwapRequest';
import { NotAvailableImageService } from 'src/app/services/not-available-image.service';

@Component({
  selector: 'app-request-management',
  templateUrl: './request-management.component.html',
  styleUrls: ['./request-management.component.css']
})
export class RequestManagementComponent implements OnInit {
  home: Home;
  faBed = faBed;
  faBath = faBath;
  receivedRequests: HomeSwapRequest[];
  sentRequests: HomeSwapRequest[];
  selectedReceivedRequest: HomeSwapRequest | undefined;
  selectedSentRequest: HomeSwapRequest | undefined;
  requestId;

  constructor(private service: HomesForSwapServiceService,
    private authService: AuthService,
    public notAvailableImageService: NotAvailableImageService) { }

  ngOnInit(): void {
    this.service.getSentRequests(this.authService.getLoggedInUserId()).subscribe(requests => {
      this.sentRequests = requests;

      if (requests.length > 0) {
        this.selectedSentRequest = requests[0];
      }
    })

    this.service.getReceivedRequests(this.authService.getLoggedInUserId()).subscribe((requests) => {
      this.receivedRequests = requests;

      if (requests.length > 0) {
        this.selectedReceivedRequest = requests[0];
        this.populateHomeDetailsAndMessages(requests[0].fromHomeId.toString(), requests[0].id);
      }
    })
  }

  receivedRequestSelectionChange(event: any) {
    this.selectedReceivedRequest = event.option.value;
    this.populateHomeDetailsAndMessages(event.option.value.fromHomeId, event.option.value.id);
  }

  sentRequestSelectionChange(event: any) {
    this.selectedSentRequest = event.option.value;
    this.populateHomeDetailsAndMessages(event.option.value.toHomeId, event.option.value.id);
  }

  tabChanged(event: any) {
    if (event.index == 1 && this.sentRequests.length > 0) {
      //Requests sent tab     
      this.populateHomeDetailsAndMessages(this.selectedSentRequest?.toHomeId, this.selectedSentRequest?.id);
    } else if (event.index == 0 && this.receivedRequests.length > 0) {
      //Requests received tab
      this.populateHomeDetailsAndMessages(this.selectedReceivedRequest?.fromHomeId, this.selectedReceivedRequest?.id);
    }
  }

  private populateHomeDetailsAndMessages(homeId: any, requestId: any) {
    this.requestId = requestId;

    if (!homeId) return;

    this.service.getHomeDetails(homeId).subscribe((data: Home) => {
      this.home = data;
    });
  }
}

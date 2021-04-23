import { Component, OnInit, ViewChild } from '@angular/core';
import { Home } from 'src/app/Models/home';
import { AuthService } from 'src/app/services/auth.service';
import { HomesForSwapServiceService } from 'src/app/services/homes-for-swap-service.service';
import { faBed, faBath } from '@fortawesome/free-solid-svg-icons';
import { HomeSwapRequest } from 'src/app/Models/homeSwapRequest';
import { NotAvailableImageService } from 'src/app/services/not-available-image.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApproveOrRejectRequestComponent } from './approve-or-reject-request/approve-or-reject-request.component';

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
  requestStatus;
  selectedTab = 0;
  constructor(private service: HomesForSwapServiceService,
    private authService: AuthService,
    public notAvailableImageService: NotAvailableImageService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.service.getSentRequests(this.authService.getLoggedInUserId()).subscribe(requests => {
      this.sentRequests = requests;

      if (requests.length > 0) {
        this.selectedSentRequest = requests[0];
      }
    })

    this.getReceivedRequests();
  }

  private getReceivedRequests() {
    this.service.getReceivedRequests(this.authService.getLoggedInUserId()).subscribe((requests) => {
      this.receivedRequests = requests;

      if (requests.length > 0) {
        this.selectedReceivedRequest = requests[0];
        this.setRequestStatus(this.selectedReceivedRequest);
        this.populateHomeDetailsAndMessages(requests[0].fromHomeId.toString(), requests[0].id);
      }
    });
  }

  receivedRequestSelectionChange(event: any) {
    this.selectedReceivedRequest = event.option.value;
    this.setRequestStatus(this.selectedReceivedRequest);
    this.populateHomeDetailsAndMessages(event.option.value.fromHomeId, event.option.value.id);
  }

  sentRequestSelectionChange(event: any) {
    this.selectedSentRequest = event.option.value;
    this.setRequestStatus(this.selectedSentRequest);
    this.populateHomeDetailsAndMessages(event.option.value.toHomeId, event.option.value.id);
  }

  tabChanged(event: any) {
    if (event.index == 1 && this.sentRequests.length > 0) {
      this.selectedTab = 1;
      this.setRequestStatus(this.selectedSentRequest);
      //Requests sent tab     
      this.populateHomeDetailsAndMessages(this.selectedSentRequest?.toHomeId, this.selectedSentRequest?.id);
    } else if (event.index == 0 && this.receivedRequests.length > 0) {
      this.selectedTab = 0;
      this.setRequestStatus(this.selectedReceivedRequest);
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

  private setRequestStatus(request: HomeSwapRequest) {
    this.requestStatus = request?.status;
  }

  onSubmit(approve: boolean) {
    const modalRef = this.modalService.open(ApproveOrRejectRequestComponent);
    modalRef.componentInstance.approve = approve;
    modalRef.componentInstance.requestId = this.selectedReceivedRequest.id;
    modalRef.componentInstance.changeStatusEvent.subscribe((status) => {
      this.getReceivedRequests();
    });
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HomesForSwapServiceService } from 'src/app/services/homes-for-swap-service.service';

@Component({
  selector: 'app-home-swap-request-confirmation-modal',
  templateUrl: './home-swap-request-confirmation-modal.component.html',
  styleUrls: ['./home-swap-request-confirmation-modal.component.css']
})
export class HomeSwapRequestConfirmationModalComponent implements OnInit {
  @Input() public checkin;
  @Input() public checkout;
  @Input() public homeId;
  @Input() public userId;

  @Output() successMessageEvent = new EventEmitter<string>();
  @Output() errorMessageEvent = new EventEmitter<string>();

  constructor(public modal: NgbActiveModal, private service: HomesForSwapServiceService) { }

  ngOnInit(): void {
  }

  send() {
    this.service.requestHomeSwap(this.checkin, this.checkout, this.homeId, this.userId).subscribe(
      (data) => {
        this.successMessageEvent.emit("Your request was sent successfully");
        this.modal.close('send');
      },
      (error) => this.handleError(error, "Error when trying to send your home swap request"),
    );
  }

  private handleError(data: any, errorMessage: any): void {
    this.errorMessageEvent.emit(errorMessage);
    this.modal.close('handleError');
    console.log("Error status: " + data.status + ", error message: " + data.message);
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HomesForSwapServiceService } from 'src/app/services/homes-for-swap-service.service';

@Component({
  selector: 'app-approve-or-reject-request',
  templateUrl: './approve-or-reject-request.component.html',
  styleUrls: ['./approve-or-reject-request.component.css']
})
export class ApproveOrRejectRequestComponent implements OnInit {
  @Input() approve: boolean;
  @Input() requestId: any;
  @Output() changeStatusEvent = new EventEmitter<number>();

  constructor(public modal: NgbActiveModal, private service: HomesForSwapServiceService) {

  }

  ngOnInit(): void {
  }

  approveRequest() {
    this.service.approveRequest(this.requestId).subscribe(
      (data) => {
        console.log("approved: " + data);
        this.changeStatusEvent.emit(data.status);
        this.modal.close('approved');
      },
      (error) => this.handleError(error, "Error when trying to send your home swap request")
    );
  }

  rejectRequest() {
    this.service.rejectRequest(this.requestId).subscribe(
      (data) => {
        console.log("rejected")
        this.changeStatusEvent.emit(data.status);
        this.modal.close('rejected');
      },
      (error) => this.handleError(error, "Error when trying to send your home swap request")
    );
  }

  private handleError(data: any, errorMessage: any): void {
    this.modal.close('handleError');
    console.log("Error status: " + data.status + ", error message: " + data.message);
  }
}

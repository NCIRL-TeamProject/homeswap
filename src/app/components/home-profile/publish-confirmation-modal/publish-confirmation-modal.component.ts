import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HomeProfileService } from 'src/app/services/home-profile.service';

@Component({
  selector: 'app-publish-confirmation-modal',
  templateUrl: './publish-confirmation-modal.component.html',
  styleUrls: ['./publish-confirmation-modal.component.css']
})
export class PublishConfirmationModalComponent implements OnInit {
  @Input() public published;
  @Input() public homeId;
  @Output() publishedChange = new EventEmitter<boolean>();
  errorMessage: String;

  constructor(public modal: NgbActiveModal, private service: HomeProfileService) { }

  ngOnInit(): void {
  }

  ok() {
    this.service.setPublish(this.homeId, !this.published).subscribe(
      (data) => {
        this.publishedChange.emit(data.published);
        this.modal.close('Ok click');
      },
      (error) => this.handleError(error, "Error when trying to publish/unpublish home profile"),
    );
  }

  private handleError(data: any, errorMessage: any): void {
    this.errorMessage = errorMessage;
    console.log("Error status: " + data.status + ", error message: " + data.message);
  }
}

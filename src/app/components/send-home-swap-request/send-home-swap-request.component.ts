import { EventEmitter, Output } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Home } from 'src/app/Models/home';
import { AuthService } from 'src/app/services/auth.service';
import { HomesForSwapServiceService } from 'src/app/services/homes-for-swap-service.service';
import { HomeSwapRequestConfirmationModalComponent } from '../home-swap-request-confirmation-modal/home-swap-request-confirmation-modal.component';

@Component({
  selector: 'app-send-home-swap-request',
  templateUrl: './send-home-swap-request.component.html',
  styleUrls: ['./send-home-swap-request.component.css']
})
export class SendHomeSwapRequestComponent implements OnInit {
  form: FormGroup;

  @Input() public homeId;
  @Output() successMessageEvent = new EventEmitter<string>();
  @Output() errorMessageEvent = new EventEmitter<string>();

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private modalService: NgbModal) {
    this.form = this.fb.group({
      start: ['', Validators.required],
      end: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (!this.form.valid) return;

    var start = this.form.get('start').value;
    var end = this.form.get('end').value;
    const userId = parseInt(this.authService.getLoggedInUserId());

    const modalRef = this.modalService.open(HomeSwapRequestConfirmationModalComponent);
    modalRef.componentInstance.homeId = this.homeId;
    modalRef.componentInstance.userId = userId;
    modalRef.componentInstance.checkin = start;
    modalRef.componentInstance.checkout = end;
    modalRef.componentInstance.successMessageEvent.subscribe((message) => {
      this.successMessageEvent.emit(message);
    });
    modalRef.componentInstance.errorMessageEvent.subscribe((message) => {
      this.errorMessageEvent.emit(message);
    });
  }
}

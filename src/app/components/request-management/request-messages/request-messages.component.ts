import { Component, Input, OnDestroy, OnInit, SimpleChanges } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { combineLatest, concat, interval, merge, Observable, Subject, Subscription, timer } from "rxjs";
import { mergeAll, retry, share, startWith, switchMap, take, takeUntil, tap } from "rxjs/operators";
import { RequestMessage } from "src/app/Models/requestMessage";
import { AuthService } from "src/app/services/auth.service";
import { RequestMessagesService } from "src/app/services/request-messages.service";

@Component({
  selector: 'app-request-messages',
  templateUrl: './request-messages.component.html',
  styleUrls: ['./request-messages.component.css']
})
export class RequestMessagesComponent implements OnInit, OnDestroy {

  @Input() requestId;
  messages: RequestMessage[];
  form: FormGroup;

  private stopPolling = new Subject();

  constructor(private fb: FormBuilder, private service: RequestMessagesService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      message: ['', [Validators.required, Validators.maxLength(512)]]
    });
  }

  pollingData: Subscription;

  ngOnChanges(changes: SimpleChanges) {
    this.requestId = changes['requestId']?.currentValue;

    if (this.requestId !== undefined) {

      this.pollingData = interval(5000)
        .pipe(
          startWith(0),
          switchMap(() => this.service.retrieveMessages(this.requestId))).subscribe(data => this.messages = data),
        share(),
        retry(),
        takeUntil(this.stopPolling)
    }
    else {
      this.messages = undefined;
      this.stopPolling.next();
    }
  }

  onSubmit() {
    if (!this.form.valid) return;

    var message = this.form.get('message').value;
    this.form.controls.message.setValue('');

    this.service.sendMessage(this.requestId, this.authService.getLoggedInUserId(), message)
      .subscribe(data => {
        this.messages.push(data);
      })
  }

  ngOnDestroy() {
    this.stopPolling.next();
    this.pollingData.unsubscribe();
  }
}

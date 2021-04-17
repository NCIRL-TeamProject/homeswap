import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { RequestMessage } from '../../../Models/RequestMessage';
import { RequestMessagesService } from '../../../services/request-messages.service';

@Component({
  selector: 'app-request-messages',
  templateUrl: './request-messages.component.html',
  styleUrls: ['./request-messages.component.css']
})
export class RequestMessagesComponent implements OnInit {

  @Input() requestId;
  messages: Observable<RequestMessage[]>;
  form: FormGroup;
  constructor(private fb: FormBuilder, private service: RequestMessagesService, private authService: AuthService) {
  }


  ngOnInit(): void {
    this.form = this.fb.group({
      message: ['', [Validators.required, Validators.maxLength(512)]]
    });

    if (!this.requestId) return;

    this.messages = this.service.retrieveMessages(this.requestId);
  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes['requestId'] !== undefined) {
      this.requestId = changes['requestId'].currentValue;
      this.messages = this.service.retrieveMessages(this.requestId);
    }
  }

  onSubmit() {
    if (!this.form.valid) return;

    var message = this.form.get('message').value;
    this.service.sendMessage(this.requestId, this.authService.getLoggedInUserId(), message).subscribe(data => {
      console.log(data);
    }, error => { console.log(error) });
  }
}

import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-alert-messages',
  templateUrl: './alert-messages.component.html',
  styleUrls: ['./alert-messages.component.css']
})
export class AlertMessagesComponent implements OnInit {
  @Input()
  errorMessage: string;
  @Input()
  successMessage: string;
  @Input()
  warningMessage: string;

  @Output() successMessageChange = new EventEmitter<string | undefined>();
  @Output() warningMessageChange = new EventEmitter<string | undefined>();
  @Output() errorMessageChange = new EventEmitter<string | undefined>();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['errorMessage'] !== undefined)
      this.errorMessage = changes['errorMessage'].currentValue;

    if (changes['successMessage'] !== undefined)
      this.successMessage = changes['successMessage'].currentValue;

    if (changes['warningMessage'] !== undefined)
      this.warningMessage = changes['warningMessage'].currentValue;
  }

  clearSuccessMessage() {
    this.successMessage = undefined;
    this.successMessageChange.emit(undefined);
  }

  clearWarningMessage() {
    this.warningMessage = undefined;
    this.warningMessageChange.emit(undefined);
  }

  clearErrorMessage() {
    this.errorMessage = undefined;
    this.errorMessageChange.emit(undefined);
  }
}

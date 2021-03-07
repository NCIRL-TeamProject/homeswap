import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-registration-form-view',
  templateUrl: './registration-form-view.component.html',
  styleUrls: ['./registration-form-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationFormViewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

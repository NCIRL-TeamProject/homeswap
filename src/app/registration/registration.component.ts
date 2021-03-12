import { Component, OnInit, ChangeDetectionStrategy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration-form/registration-form.component.html',
  styleUrls: ['./registration.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class RegistrationComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

}

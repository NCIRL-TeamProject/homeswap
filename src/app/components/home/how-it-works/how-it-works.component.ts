import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {Location } from '@angular/common';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HowItWorksComponent implements OnInit {

  constructor(private _location: Location) {  
    console.log('test');
    console.log(this._location.prepareExternalUrl('assets/Banner.png'));
  }

  ngOnInit(): void {
  }

}

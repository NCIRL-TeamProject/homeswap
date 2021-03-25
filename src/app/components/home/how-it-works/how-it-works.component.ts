import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HowItWorksComponent implements OnInit {

  constructor() {  

  }

  ngOnInit(): void {
  }
  
}

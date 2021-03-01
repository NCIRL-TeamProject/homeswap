import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-click-counter',
  templateUrl: './click-counter.component.html',
  styleUrls: ['./click-counter.component.css']
})
export class ClickCounterComponent implements OnInit {
  public counter : number = 0;
  constructor() { }

  ngOnInit(): void {
  }
  
  increment(){
    this.counter += 1;
  }
  
  decrement(){
    this.counter -= 1;
  }
}

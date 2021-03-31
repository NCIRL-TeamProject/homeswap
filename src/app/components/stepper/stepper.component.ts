import { Component, Input, OnInit } from '@angular/core';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent implements OnInit {

  faPlus = faPlusCircle;
  faMinus = faMinusCircle;
  value = 3;

  @Input()
  formControlName: string;

  constructor() { }

  ngOnInit(): void {
  }

  increment() {
    if (this.value < 10)
      this.value++;
  }


  decrement() {

    if (this.value > 0)
      this.value--;
  }
}

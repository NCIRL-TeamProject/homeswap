import { Component, OnInit } from '@angular/core';
import { faPlusCircle, faMinusCircle, faBed } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-homes-listing-filter',
  templateUrl: './homes-listing-filter.component.html',
  styleUrls: ['./homes-listing-filter.component.css']
})
export class HomesListingFilterComponent implements OnInit {
  faPlus = faPlusCircle;
  faMinus = faMinusCircle;
  faBed = faBed;
  value = 3;

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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
  form: FormGroup;
  constructor(private fb: FormBuilder, private router: Router) {

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      place: ['']
    });
  }

  increment() {
    if (this.value < 10)
      this.value++;
  }


  decrement() {

    if (this.value > 0)
      this.value--;
  }

  onSubmit() {
    if (!this.form.valid) return;

    var place = this.form.get('place').value;
    this.router.navigate(['homes-for-swapping', { place: place }]);
  }
}

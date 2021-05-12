import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location, Appearance } from '@angular-material-extensions/google-maps-autocomplete';

import PlaceResult = google.maps.places.PlaceResult;

@Component({
  selector: 'app-homes-listing-filter',
  templateUrl: './homes-listing-filter.component.html',
  styleUrls: ['./homes-listing-filter.component.css']
})
export class HomesListingFilterComponent implements OnInit {
  public appearance = Appearance;
  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  onAutocompleteSelected(result: PlaceResult) {
    this.router.navigate(['homes-for-swapping', result.name]);
  }

  onLocationSelected(location: Location) {
    // console.log('onLocationSelected: ', location);
    // this.latitude = location.latitude;
    // this.longitude = location.longitude;
  }

}

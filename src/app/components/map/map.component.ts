import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { GeocodeService } from 'src/app/services/geocode.service';
import { LocationData } from '../../Models/LocationData';

@Component({
  selector: 'home-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @Input()
  address: string;

  location: LocationData = { lat: 53.349943551810966, lng: -6.260286979853556, zoom: 10 }

  constructor(private geocodeService: GeocodeService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    const addressValue = changes["address"];

    if (!addressValue || !addressValue?.currentValue) return;

    this.geocodeAddress(addressValue);

  }

  private geocodeAddress(addressValue) {
    this.geocodeService.geocodeAddress(addressValue?.currentValue)
      .subscribe((location: LocationData) => {
        this.location = location;
        this.location.zoom = 15;
      });
  }
}

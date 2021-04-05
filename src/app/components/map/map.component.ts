import { ChangeDetectorRef, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { LocationData } from 'src/app/Models/LocationData';
import { GeocodeService } from 'src/app/services/geocode.service';

@Component({
  selector: 'home-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @Input()
  address: string;

  location: LocationData = { lat: 53.349943551810966, lng: -6.260286979853556, zoom: 10 };
  subscription: Subscription;

  constructor(private geocodeService: GeocodeService, private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    const addressValue = changes["address"];

    if (!addressValue || !addressValue?.currentValue) return;

    this.geocodeAddress(addressValue.currentValue);
  }

  private geocodeAddress(addressLocation) {
    this.subscription = this.geocodeService.geocodeAddress(addressLocation)
      .subscribe((location: LocationData) => {
        this.location = location;
        this.location.zoom = 15;
        this.ref.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Home } from 'src/app/Models/home';
import { HomesForSwapServiceService } from 'src/app/services/homes-for-swap-service.service';
import { faBed, faBath } from '@fortawesome/free-solid-svg-icons';
import { NotAvailableImageService } from 'src/app/services/not-available-image.service';

@Component({
  selector: 'app-home-detail',
  templateUrl: './home-detail.component.html',
  styleUrls: ['./home-detail.component.css']
})
export class HomeDetailComponent implements OnInit {
  id: string;
  home?: Home;
  address: string;
  faBed = faBed;
  faBath = faBath;

  constructor(private ActivatedRoute: ActivatedRoute,
    private service: HomesForSwapServiceService,
    private router: Router,
    public notAvailableImage: NotAvailableImageService) { }

  ngOnInit(): void {
    this.id = this.ActivatedRoute.snapshot.paramMap.get("id");

    if (!this.id)
      return;

    this.service.getHomeDetails(this.id).subscribe((data: Home) => {
      this.home = data;
      this.address = data.getAddressLocation();
    }, (error) => {
      if (error.status === 404) {
        console.log("Home details not found");
        this.router.navigate(['/']);
        return;
      }

      console.log("Error")
    }
    );
  }

  onBack(): void {
    this.router.navigate(['homes-for-swapping']);
  }
}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Home } from 'src/app/models/home';
import { HomesForSwapServiceService } from 'src/app/services/homes-for-swap-service.service';
import { faBed, faBath } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-homes-for-swap-list',
  templateUrl: './homes-for-swap-list.component.html',
  styleUrls: ['./homes-for-swap-list.component.css']
})
export class HomesForSwapListComponent implements OnInit {
  homes$: Observable<Home[]>;
  faBed = faBed;
  faBath = faBath;
  filter: string;
  constructor(private homesForSwapping: HomesForSwapServiceService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const place = this.activatedRoute.snapshot.paramMap.get("place");

    this.homes$ = this.homesForSwapping.getHomesForSwapping(place);
  }

}

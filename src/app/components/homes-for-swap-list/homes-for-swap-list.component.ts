import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Home } from 'src/app/Models/home';
import { HomesForSwapServiceService } from 'src/app/services/homes-for-swap-service.service';

@Component({
  selector: 'app-homes-for-swap-list',
  templateUrl: './homes-for-swap-list.component.html',
  styleUrls: ['./homes-for-swap-list.component.css']
})
export class HomesForSwapListComponent implements OnInit {
  homes$: Observable<Home[]>;

  constructor(private homesForSwapping: HomesForSwapServiceService) { }

  ngOnInit(): void {
    this.homes$ = this.homesForSwapping.getHomesForSwapping();
  }

}

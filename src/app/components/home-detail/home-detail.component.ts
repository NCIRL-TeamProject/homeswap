import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Home } from 'src/app/Models/home';
import { HomesForSwapServiceService } from 'src/app/services/homes-for-swap-service.service';

@Component({
  selector: 'app-home-detail',
  templateUrl: './home-detail.component.html',
  styleUrls: ['./home-detail.component.css']
})
export class HomeDetailComponent implements OnInit {
  id: string;
  home?: Home;

  constructor(private ActivatedRoute: ActivatedRoute,
    private service: HomesForSwapServiceService,
    private router: Router) { }

  ngOnInit(): void {
    this.id = this.ActivatedRoute.snapshot.paramMap.get("id");

    if (!this.id)
      return;

    this.service.getHomeDetails(this.id).subscribe((data: Home) => {

      this.home = data;
    }, (error) => { console.log("Error") }
    );
  }



  onBack(): void {
    this.router.navigate(['homes-for-swapping']);
  }
}

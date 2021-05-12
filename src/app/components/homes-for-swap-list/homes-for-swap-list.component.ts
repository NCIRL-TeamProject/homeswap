import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Home } from 'src/app/Models/home';
import { HomesForSwapServiceService } from 'src/app/services/homes-for-swap-service.service';
import { faBed, faBath } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotAvailableImageService } from 'src/app/services/not-available-image.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-homes-for-swap-list',
  templateUrl: './homes-for-swap-list.component.html',
  styleUrls: ['./homes-for-swap-list.component.css']
})
export class HomesForSwapListComponent implements OnInit {
  homes: Home[];
  total;
  pageSize = 16;
  faBed = faBed;
  faBath = faBath;
  filter: string;
  place;

  constructor(private homesForSwapping: HomesForSwapServiceService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    public notAvailableImage: NotAvailableImageService,
    private ref: ChangeDetectorRef,
    private spinnerService: SpinnerService) { }

  ngOnInit(): void {
    this.getData(0, this.pageSize);
  }

  onPageChange($event) {
    let pageIndex = $event.pageIndex;
    let pageSize = $event.pageSize;
    let previousSize = pageSize * pageIndex;
    this.getNextData(previousSize, (pageIndex).toString(), pageSize.toString());
  }

  private getData(offset: any, limit: any) {
    this.spinnerService.show();
    const place = this.activatedRoute.snapshot.paramMap.get("place");

    this.homesForSwapping.getHomesForSwapping(offset, limit, place, this.authService.getLoggedInUserId()).subscribe(data => {
      this.place = place;
      this.homes = data.homes;
      this.total = data.total;

      setTimeout(() => this.spinnerService.hide(), 1000);
    })
  }

  getNextData(currentSize, offset, limit) {
    this.spinnerService.show();
    const place = this.activatedRoute.snapshot.paramMap.get("place");

    this.homesForSwapping.getHomesForSwapping(offset, limit, place, this.authService.getLoggedInUserId()).subscribe(data => {
      this.homes.length = currentSize;
      this.homes.push(...data.homes);
      this.total = data.total;

      setTimeout(() => this.spinnerService.hide(), 1000);
    })
  }
}

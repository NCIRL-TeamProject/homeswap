import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomesListingFilterComponent } from './homes-listing-filter.component';

describe('HomesListingFilterComponent', () => {
  let component: HomesListingFilterComponent;
  let fixture: ComponentFixture<HomesListingFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomesListingFilterComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomesListingFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

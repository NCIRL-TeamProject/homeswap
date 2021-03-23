import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomesForSwapListComponent } from './homes-for-swap-list.component';

describe('HomesForSwapListComponent', () => {
  let component: HomesForSwapListComponent;
  let fixture: ComponentFixture<HomesForSwapListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomesForSwapListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomesForSwapListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

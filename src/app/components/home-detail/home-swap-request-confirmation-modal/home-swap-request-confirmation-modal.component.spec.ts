import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSwapRequestConfirmationModalComponent } from './home-swap-request-confirmation-modal.component';

describe('HomeSwapRequestConfirmationModalComponent', () => {
  let component: HomeSwapRequestConfirmationModalComponent;
  let fixture: ComponentFixture<HomeSwapRequestConfirmationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeSwapRequestConfirmationModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeSwapRequestConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

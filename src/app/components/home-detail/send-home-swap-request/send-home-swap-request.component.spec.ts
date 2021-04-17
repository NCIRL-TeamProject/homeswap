import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendHomeSwapRequestComponent } from './send-home-swap-request.component';

describe('SendHomeSwapRequestComponent', () => {
  let component: SendHomeSwapRequestComponent;
  let fixture: ComponentFixture<SendHomeSwapRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendHomeSwapRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendHomeSwapRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveOrRejectRequestComponent } from './approve-or-reject-request.component';

describe('ApproveOrRejectRequestComponent', () => {
  let component: ApproveOrRejectRequestComponent;
  let fixture: ComponentFixture<ApproveOrRejectRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveOrRejectRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveOrRejectRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishConfirmationModalComponent } from './publish-confirmation-modal.component';

describe('PublishConfirmationModalComponent', () => {
  let component: PublishConfirmationModalComponent;
  let fixture: ComponentFixture<PublishConfirmationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublishConfirmationModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

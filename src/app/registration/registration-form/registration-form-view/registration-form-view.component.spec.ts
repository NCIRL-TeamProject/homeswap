import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationFormViewComponent } from './registration-form-view.component';

describe('RegistrationFormViewComponent', () => {
  let component: RegistrationFormViewComponent;
  let fixture: ComponentFixture<RegistrationFormViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationFormViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationFormViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

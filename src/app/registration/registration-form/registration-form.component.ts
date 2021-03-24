import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { User } from '../../Models/user';
import { Subscription } from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-registration',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationFormComponent implements OnInit, OnDestroy {
  user: User;
  registerForm: FormGroup;
  stepOneCompleted = false;
  confirmMatches = false;
  private subscription: Subscription;

  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
      dbo: ['', [Validators.required, Validators.pattern(/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/)]],
      // Password fields will be set as required after step one is completed
      password: [''],
      confirmPassword: ['']
    });
  }

  ngOnInit(): void {
  }

  submitForm(): void {
    // console.log('step one submitted');
    this.prepareForm();
  }

  private prepareForm(): void {
    const formModel = this.registerForm.value;
    if (this.registerForm.valid) {
      if (!this.stepOneCompleted) {
        // console.log('step one completed');
        this.registerForm.controls['password']
          .setValidators([Validators.required, Validators.pattern(/^(?=.*?[a-z])(?=.*?[A-Z]).{8,}$/)]);
        this.registerForm.controls['confirmPassword']
          .setValidators([Validators.required, Validators.pattern(/^(?=.*?[a-z])(?=.*?[A-Z]).{8,}$/)]);
        this.stepOneCompleted = true;
      }
      else {
        this.user = new User();
        this.user.firstName = formModel.firstName;
        this.user.lastName = formModel.lastName;
        this.user.email = formModel.email;
        this.user.dbo = formModel.dbo;
        this.user.password = formModel.password;
        if (formModel.password === formModel.confirmPassword) {
          this.confirmMatches = true;
          this.registerUser(this.user);
        }
        else {
          this.confirmMatches = false;
        }
      }
    }
  }

  isValidInput(fieldName): boolean {
    return this.registerForm.controls[fieldName].invalid &&
      (this.registerForm.controls[fieldName].dirty || this.registerForm.controls[fieldName].touched);
  }

  private registerUser(user: User): void {
    this.subscription = this.authService.register(user).subscribe(
      res => {
        // TODO: Add success message logic
        this.router.navigate(['login']);
      }, err => {
        // TODO: Add error alert message logic
      }
    );
    this.registerForm.reset();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

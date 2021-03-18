import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { User } from '../_models/user';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-registration',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationFormComponent implements OnInit {
  user: User;
  registerForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      firstName : [''],
      lastName: [''],
      email: [''],
      password: ['']
    });
  }

  ngOnInit(): void {
  }

  registerUser(): void {
    console.log('registered');
    const formModel = this.registerForm.value;
    formModel.password = '12356';
    this.authService.register(this.registerForm.value).subscribe((res) => {
      if (res.result) {
        this.registerForm.reset();
        this.router.navigate(['login']);
      }
  });
}

}

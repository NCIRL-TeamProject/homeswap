import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable, Subscription, throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  errorMessage: string;
  subscription: Subscription;

  constructor(public fb: FormBuilder, public router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  login() {
    if (this.form.invalid) {
      return;
    }

    var email = this.form.get('email').value;
    var password = this.form.get('password').value;

    this.subscription = this.authService.login(email, password).subscribe((res: any) => {
      this.router.navigate(['/']);
    },
      error => {
        this.errorMessage = "Invalid user credentials";
      })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}

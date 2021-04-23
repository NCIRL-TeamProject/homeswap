import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/Models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-account-remove',
  templateUrl: './account-remove.component.html',
  styleUrls: ['./account-remove.component.css']
})
export class AccountRemoveComponent implements OnInit, OnDestroy {
  removeAccountForm: FormGroup;
  isSubmitted = false;
  private subscription: Subscription;
  private user: User;

  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.removeAccountForm = this.formBuilder.group({
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.user = null;
  }

  public removeAccount(): void {
    this.isSubmitted = true;
    if (this.authService.isLoggedIn) {
      this.user = this.getUserToBeRemoved();
      if (this.user != null) {
        const userId = this.getUserId();
        this.removeUser(this.user, userId);
      }
    }
    else {
      // TODO: improve this by redirecting to login instead
      this.router.navigate(['register']);
    }
    this.isSubmitted = false;
  }

  private getUserToBeRemoved(): User {
    if (this.removeAccountForm.valid) {
      const userToBeRemoved = new User();
      userToBeRemoved.email = this.getUserEmail();
      const formModel = this.removeAccountForm.value;
      userToBeRemoved.password = formModel.password;
      return userToBeRemoved;
    }
  }

  private getUserId(): string {
    let userId: string = null;
    userId = this.authService.getLoggedInUserId();
    return userId;
  }

  private getUserEmail(): string {
    let email: string = null;
    email = this.authService.getLoggedInUserEmail();
    return email;
  }

  private removeUser(user: User, userId: string): void {
    this.subscription = this.authService.removeAccount(user, userId).subscribe(
      err => {
        // TODO: Add error alert message logic
      }
    );
    this.removeAccountForm.reset();
  }

  isValidInput(fieldName): boolean {
    if (this.removeAccountForm.controls[fieldName].touched) {
      this.isSubmitted = false;
      return this.removeAccountForm.controls[fieldName].touched &&
        this.removeAccountForm.controls[fieldName].invalid && this.removeAccountForm.controls[fieldName].dirty;
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}

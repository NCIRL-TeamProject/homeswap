import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/Models/user';
import { NgbModal, ModalDismissReasons, NgbCalendar, NgbDateAdapter, NgbNav, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { AccountService } from '../_services/account.service';
import { catchError, map } from 'rxjs/operators';


@Component({
  selector: 'app-account-update',
  templateUrl: './account-update.component.html',
  styleUrls: ['./account-update.component.css']
})

export class AccountUpdateComponent implements OnInit, OnDestroy {
  active = 1;
  closeResult = '';
  userDetails: User;
  userSecurityForm: FormGroup;
  userBasicDetailsForm: FormGroup;
  confirmMatches = false;
  model1: string;
  model2: string;
  paneRole: any;
  nav: NgbNav;
  errorMessage: string;
  successMessage: any;
  warningMessage: string;
  private subscription: Subscription;
  defaultImageSrc = 'assets/account-assets/user_avatar.jpg';
  constructor(public formBuilder: FormBuilder,
              public router: Router,
              private modalService: NgbModal,
              private accountService: AccountService, private ngbCalendar: NgbCalendar, private dateAdapter: NgbDateAdapter<string>,
              private customDateParserFormatter: NgbDateParserFormatter) {
    this.initializeUserBasicDetailsForm();
    this.initializeUserSecurityForm();
  }

  ngOnInit(): void {
    this.populateUserDetails();
  }


  private initializeUserBasicDetailsForm(): void {
    this.userBasicDetailsForm = this.formBuilder.group({
      email: [{ value: '', disabled: true }, Validators.required],
      firstName: ['', [Validators.required, Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.maxLength(20)]],
      dbo: ['', [Validators.required, Validators.pattern(/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/)]],
      password: ['', Validators.pattern(/^(?=.*?[a-z])(?=.*?[A-Z]).{8,}$/)],
      image: [''],
      fileInput: ['']
    });
  }

  private initializeUserSecurityForm(): void{
    this.userSecurityForm = this.formBuilder.group({
      currentPassword: ['',
        [Validators.required, Validators.pattern(/^(?=.*?[a-z])(?=.*?[A-Z]).{8,}$/)]],
      newPassword: ['', [Validators.required, Validators.pattern(/^(?=.*?[a-z])(?=.*?[A-Z]).{8,}$/)]],
      confirmNewPassword: ['', [Validators.required, Validators.pattern(/^(?=.*?[a-z])(?=.*?[A-Z]).{8,}$/)]],
    });
  }

  private populateUserBasicDetailsForm(): void {
    this.userBasicDetailsForm.patchValue({
      firstName: this.userDetails.firstName,
      lastName: this.userDetails.lastName,
      email: this.userDetails.email,
      dbo: this.userDetails.dbo,
      image: '',
      fileInput: ''
    });
  }

  // needed for ngdatepicker
  get today(): string {
    return this.dateAdapter.toModel(this.ngbCalendar.getToday());
  }

  populateUserDetails(): void {
    this.userDetails = new User();
    const userId: any = this.accountService.getUserId();
    if (userId != null) {
      this.accountService.getUserDetails(userId).subscribe(user => {
        this.userDetails.email = user.email;
        const formattedDate = this.customDateParserFormatter.parse(user.dbo);
        this.userDetails.dbo = this.dateAdapter.toModel(formattedDate);
        this.userDetails.firstName = user.firstName;
        this.userDetails.lastName = user.lastName;
        this.userDetails.profileImage = user.profileImage;
        this.populateUserBasicDetailsForm();
      });
    }
    else {
      // session expired
      this.router.navigate(['login']);
    }
  }

  public isInvalidUserSecurityFormInput(fieldName: string): boolean {
    return this.accountService.isInvalidInput(fieldName, this.userSecurityForm);
  }

  public isInvalidUserBasicDetailsFormInput(fieldName: string): boolean {
    return this.accountService.isInvalidInput(fieldName, this.userBasicDetailsForm);
  }

  open(content): void {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then((result) => {
        if (result === 'Saved') {
          if (this.isPasswordValueProvided(this.userBasicDetailsForm.controls['password'].value)) {
            this.updateAccount();
            this.populateUserDetails();
          }
        }
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  private isPasswordValueProvided(password: string): boolean {
    if (password === null || password === '' || password === undefined) {
      return false;
    }
    return true;
  }

  private getUserToBeUpdated(user: User): User {
    if (this.userBasicDetailsForm.valid) {
      const formModel = this.userBasicDetailsForm.value;
      const formattedDate = this.dateAdapter.fromModel(formModel.dbo);
      user.firstName = formModel.firstName;
      user.lastName = formModel.lastName;
      user.dbo = this.customDateParserFormatter.format(formattedDate);
      user.password = formModel.password;
      return user;
    }
  }

  public updateAccount(): void {
    this.accountService.validatesUserIsLoggedIn();
    this.userDetails = this.getUserToBeUpdated(this.userDetails);
    if (this.userDetails != null) {
      const userId = this.accountService.getUserId();
      this.updateUser(this.userDetails, userId);
    }
  }

  private updateUser(user: User, userId: string): void {
    this.accountService.updateUser(user, userId);
    this.accountService.updateUser(user, userId).pipe(
      map(
        (res) => {
          this.successMessage = res.message;
        },
      ), catchError((err) => { this.errorMessage = err; return err; }))
      .toPromise().finally(() => {
        this.populateUserDetails();
      });
  }

  public updatePassword(): void {
    this.accountService.validatesUserIsLoggedIn();
    const user = new User();
    user.password = this.userSecurityForm.controls['newPassword'].value;
    const userId = this.accountService.getUserId();
    this.accountService.updatePassword(user, userId).pipe(
      map(
        (res) => {
          this.successMessage = res.message;
        },
      ), catchError((err) => { this.errorMessage = err; return err; }))
      .toPromise().finally(() => {
        this.initializeUserSecurityForm();
      });
  }

  public canUpdatePassword(): boolean {
    let canUpdate = true;
    Object.keys(this.userSecurityForm.controls).forEach(key => {
      if (!this.userSecurityForm.controls[key].touched) {
        if (!this.isPasswordValueProvided(this.userSecurityForm.controls[key].value)) {
          canUpdate = false;
        }
      }
      if (this.isInvalidUserSecurityFormInput(key)) {
        canUpdate = false;
      }
    });
    return canUpdate && this.passwordMatch();
  }

  public passwordMatch(): boolean {
    const password = this.userSecurityForm.controls['newPassword'].value;
    const confirmPassword = this.userSecurityForm.controls['confirmNewPassword'].value;
    if (password === confirmPassword) {
      return true;
    }
    return false;
  }

  public updateProfilePicture(): void {
    if (this.canUpdatePicture()) {
      const user = new User();
      user.profileImage = this.userBasicDetailsForm.controls['image'].value;
      const userId = this.accountService.getUserId();
      this.accountService.updateProfilePicture(user, userId).pipe(
        map(
          (res) => {
            this.successMessage = res.message;
          },
        ), catchError((err) => { this.errorMessage = err; return err; }))
        .toPromise().finally(() => {
          this.userBasicDetailsForm.patchValue({ fileInput: null });
          this.userBasicDetailsForm.patchValue({ image: null });
        });
    }
  }

  private canUpdatePicture(): boolean {
    this.accountService.validatesUserIsLoggedIn();
    if (this.isNewImageProvided()) {
      return true;
    }
    return false;
  }

  private isNewImageProvided(): boolean {
    const imageUploaded = this.userBasicDetailsForm.controls['image'].value;
    if (imageUploaded !== '' && imageUploaded !== undefined && imageUploaded != null) {
      return true;
    }
    return false;
  }

  private onFileChange(event): void {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.userBasicDetailsForm.patchValue({ image: file });
      };

    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}



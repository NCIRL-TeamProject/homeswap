import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Home } from '../../Models/home';
import { HomeProfileService } from '../../services/home-profile.service';
import { Subscription } from 'rxjs';
import { faBed, faBath } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home-profile',
  templateUrl: './home-profile.component.html',
  styleUrls: ['./home-profile.component.css']
})

export class HomeProfileComponent implements OnInit {
  form: FormGroup;
  imageSrc: String;
  errorMessage: String;
  successfulMessage: String;
  warningMessage: String;
  address: string;
  subscriptionGet: Subscription;
  subscriptionSave: Subscription;
  faBed = faBed;
  faBath = faBath;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private homeProfileService: HomeProfileService
  ) {

    this.form = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      userId: [authService.getLoggedInUserId()],
      image: [''],
      fileSource: [''],
      country: ['Ireland'],
      streetAddress: [''],
      city: [''],
      eircode: [''],
      bedrooms: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      beds: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      bathrooms: ['', [Validators.required, Validators.min(1), Validators.max(10)]]
    })
  }

  ngOnInit(): void {
    this.populateHomeProfile();
    this.errorMessage = null;
    this.successfulMessage = null;
  }

  populateHomeProfile() {
    this.subscriptionGet = this.homeProfileService.get(this.form.controls.userId.value)
      .subscribe((data: Home) => {
        this.form.controls.title.patchValue(data.title);
        this.form.controls.description.patchValue(data.description);
        this.form.controls.streetAddress.patchValue(data.streetAddress);
        this.form.controls.city.patchValue(data.city);
        this.form.controls.country.patchValue(data.country);
        this.form.controls.eircode.patchValue(data.postCode);
        this.form.controls.bedrooms.patchValue(data.bedrooms);
        this.form.controls.beds.patchValue(data.beds);
        this.form.controls.bathrooms.patchValue(data.bathrooms);

        this.address = data.getAddressLocation();
        this.imageSrc = data.image;

      }, (error) => this.handleError(error, "Error when trying to retrieve home profile")
      );
  }

  onSubmit() {
    if (!this.form.valid) return;

    var title = this.form.get('title').value;
    var description = this.form.get('description').value;
    var userId = this.form.get('userId').value;
    var image = this.form.get('image').value;
    var streetAddress = this.form.get('streetAddress').value;
    var city = this.form.get('city').value;
    var country = this.form.get('country').value;
    var postCode = this.form.get('eircode').value;
    var bathrooms = this.form.get('bathrooms').value;
    var bedrooms = this.form.get('bedrooms').value;
    var beds = this.form.get('beds').value;

    var home = {
      title: title,
      description: description,
      userId: userId,
      image: image,
      streetAddress: streetAddress,
      city: city,
      country: country,
      postCode: postCode,
      bathrooms: bathrooms,
      bedrooms: bedrooms,
      beds: beds
    } as Home;

    this.subscriptionSave = this.homeProfileService.save(home).subscribe(
      (error) => this.handleError(error, "Error when trying to update a home profile"),
      this.handleSuccessful("Home profile updated")
    )
  }

  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.form.patchValue({ image: file });
      };
    }
  }

  onaddressLocationChange() {
    const streetAddress = this.form.get('streetAddress').value;
    const eircode = this.form.get('eircode').value;

    if (eircode && eircode !== '')
      this.address = eircode;
    else {
      this.address = streetAddress;
    }

  }

  private handleError(error: any, errorMessage: any): void {
    if (error.status === 404) {
      this.warningMessage = "Please complete your home details";
      return;
    }

    this.errorMessage = errorMessage;
    console.log(this.errorMessage + ". Error: " + error);
  }

  private handleSuccessful(message: any): () => void {
    return () => {
      this.successfulMessage = message;
    }
  }

  ngOnDestroy(): void {
    this.subscriptionGet?.unsubscribe();
    this.subscriptionSave?.unsubscribe();
  }

  isValidInput(fieldName): boolean {
    return this.form.controls[fieldName].invalid &&
      (this.form.controls[fieldName].dirty || this.form.controls[fieldName].touched);
  }
}

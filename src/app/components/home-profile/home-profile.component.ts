import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Home } from '../../Models/home';
import { HomeProfileService } from '../../services/home-profile.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home-profile',
  templateUrl: './home-profile.component.html',
  styleUrls: ['./home-profile.component.css']
})

export class HomeProfileComponent implements OnInit {
  lat = 53.349943551810966;
  long = -6.260286979853556;
  zoom = 10;

  form: FormGroup;
  imageSrc: String;
  errorMessage: String;
  successfulMessage: String;
  geoCoder: google.maps.Geocoder;

  constructor(private fb: FormBuilder,
    private http: HttpClient,
    private authService: AuthService,
    private homeProfileService: HomeProfileService
  ) {

    this.form = this.fb.group({
      title: [''],
      description: [''],
      userId: [authService.getLoggedInUserId()],
      image: [''],
      fileSource: [''],
      country: ['Ireland'],
      streetAddress: [''],
      city: [''],
      eircode: ['']
    })
  }

  ngOnInit(): void {
    this.populateHomeProfile();
    this.errorMessage = null;
    this.successfulMessage = null;
  }

  populateHomeProfile() {
    this.homeProfileService.get(this.form.controls.userId.value)
      .subscribe((data: Home) => {
        this.form.controls.title.patchValue(data.title);
        this.form.controls.description.patchValue(data.description);
        this.form.controls.streetAddress.patchValue(data.streetAddress);
        this.form.controls.city.patchValue(data.city);
        this.form.controls.country.patchValue(data.country);
        this.form.controls.eircode.patchValue(data.postCode);
        this.imageSrc = data.image;

        if (data.postCode) {
          this.setLatitudeAndLongitudeBy(data.postCode);
        }
        else if (data.streetAddress) {
          this.setLatitudeAndLongitudeBy(data.streetAddress);
        }

      }, (error) => this.handleError(error, "Error when trying to retrieve home profile")
      );
  }

  onSubmit() {
    var title = this.form.get('title').value;
    var description = this.form.get('description').value;
    var userId = this.form.get('userId').value;
    var image = this.form.get('image').value;
    var streetAddress = this.form.get('streetAddress').value;
    var city = this.form.get('city').value;
    var country = this.form.get('country').value;
    var postCode = this.form.get('eircode').value;

    var home = {
      title: title,
      description: description,
      userId: userId,
      image: image,
      streetAddress: streetAddress,
      city: city,
      country: country,
      postCode: postCode
    } as Home;

    this.homeProfileService.save(home).subscribe(
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

  onStreetAddressChange(event) {
    const value = this.form.get('streetAddress').value;
    this.setLatitudeAndLongitudeBy(value);
  }

  onEircodeChange(event) {
    const value = this.form.get('eircode').value;
    this.setLatitudeAndLongitudeBy(value);
  }

  setLatitudeAndLongitudeBy(value: string) {
    this.geoCoder = new google.maps.Geocoder;

    this.geoCoder.geocode({ 'address': value, 'componentRestrictions': { 'country': 'IE' } }, (results, status) => {
      console.log(results);
      console.log(status);

      if (status === "OK" && Array.isArray(results) && results.length > 0) {
        this.lat = results[0].geometry?.location?.lat();
        this.long = results[0].geometry?.location?.lng();
        this.zoom = 15;
      }
    });
  }


  private handleError(error: any, errorMessage: any): void {
    this.errorMessage = errorMessage;
    console.log(this.errorMessage + ". Error: " + error);
  }

  private handleSuccessful(message: any): () => void {
    return () => {
      this.successfulMessage = message;
    }
  }
}

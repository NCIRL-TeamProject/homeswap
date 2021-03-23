import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Home } from '../../Models/home';
import { HomeProfileService } from '../../services/home-profile.service';
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

  constructor(private fb: FormBuilder,
    private http: HttpClient,
    private authService: AuthService,
    private homeProfileService: HomeProfileService) {

    this.form = this.fb.group({
      title: [''],
      description: [''],
      userId: [authService.getLoggedInUserId()],
      image: [''],
      fileSource: ['']
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
        this.imageSrc = data.image;
      }, (error) => this.handleError(error, "Error when trying to retrieve home profile")
      );
  }

  onSubmit() {
    var title = this.form.get('title').value;
    var description = this.form.get('description').value;
    var userId = this.form.get('userId').value;
    var image = this.form.get('image').value;

    this.homeProfileService.save(title, description, userId, image).subscribe(
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

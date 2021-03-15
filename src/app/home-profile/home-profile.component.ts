import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Home } from '../Model/home';

@Component({
  selector: 'app-home-profile',
  templateUrl: './home-profile.component.html',
  styleUrls: ['./home-profile.component.css']
})

export class HomeProfileComponent implements OnInit {
  form: FormGroup;
  imageSrc: String;

  constructor(private fb: FormBuilder, private http: HttpClient) {

    this.form = this.fb.group({
      title: [''],
      description: [''],
      userId: [1],
      image: [''],
      fileSource: ['']
    })

    this.populateHomeProfile();

  }

  ngOnInit(): void {
  }

  populateHomeProfile() {

    const params = new HttpParams().set('userId', this.form.controls.userId.value);

    this.http.get('api/gethomeprofile', { params }).subscribe((data: Home) => {
      this.form.controls.title.patchValue(data.title);
      this.form.controls.description.patchValue(data.description);
      this.imageSrc = data.image;
    });

  }

  onSubmit() {
    var title = this.form.get('title').value;
    var description = this.form.get('description').value;
    var userId = this.form.get('userId').value;
    var image = this.form.get('image').value;

    var formData: any = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("userId", userId);
    formData.append("image", image);
    this.http.post('api/homeprofile', formData).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    )
  }

  onUserIdChange(event) {
    this.populateHomeProfile();

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

}

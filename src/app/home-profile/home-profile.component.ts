import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home-profile',
  templateUrl: './home-profile.component.html',
  styleUrls: ['./home-profile.component.css']
})
export class HomeProfileComponent implements OnInit {
  // homeProfileForm = new FormGroup({
  //   title: new FormControl(''),
  //   description: new FormControl(''),
  //   userId: new FormControl('')
  // });
  form: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      title: [''],
      description: [''],
      userId: ['']
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.form.value);
    var title = this.form.get('title').value;
    var description = this.form.get('description').value;
    var userId = this.form.get('userId').value;
    console.log(title)
    console.log(description)
    console.log(userId)

    var formData: any = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("userId", userId);

    this.http.post('api/homeprofile', formData).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    )

  }
}

import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { RegistrationRoutingModule} from './registration-routing-module';
import { RegistrationComponent } from './registration.component';
import { RegistrationFormViewComponent } from './registration-form/registration-form-view/registration-form-view.component';

@NgModule({
    imports: [
        CommonModule,
        NgbModule,
        ReactiveFormsModule,
        RegistrationRoutingModule
    ],
    declarations: [
        RegistrationComponent,
        RegistrationFormComponent,
        RegistrationFormViewComponent
    ]
})
export class RegistrationModule { }
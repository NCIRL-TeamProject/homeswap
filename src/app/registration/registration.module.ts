import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { RegistrationRoutingModule} from './registration-routing-module';
import { RegistrationFormViewComponent } from './registration-form/registration-form-view/registration-form-view.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RegistrationRoutingModule
    ],
    declarations: [
        RegistrationFormComponent,
        RegistrationFormViewComponent
    ]
})
export class RegistrationModule { }

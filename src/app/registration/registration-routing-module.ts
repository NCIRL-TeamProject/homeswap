import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Main
import { RegistrationFormViewComponent } from './registration-form/registration-form-view/registration-form-view.component';
import { RegistrationComponent } from './registration.component';

// Steps
// TODO: steps for registration here

const routes: Routes = [
    {
        path: '',
        component: RegistrationComponent,
        children:
        [
            {path: 'register/form', component: RegistrationFormViewComponent },
        ]
    }
];

@NgModule({
 imports: [
     RouterModule.forChild(
         routes
     )
 ],
 exports: [
     RouterModule
 ]
})
export class RegistrationRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeProfileComponent } from './home-profile/home-profile.component';

// Auth Implement when user already logged in
// import { AuthGuard } from './../auth.guard';

// Content
import { HomeComponent } from './home/home.component';
import { HowItWorksComponent } from './home/how-it-works/how-it-works.component';
import { RegistrationFormComponent } from './registration/registration-form/registration-form.component';

const appRoutes: Routes = [
    // Home
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent  },
    { path: 'how-it-works', component: HowItWorksComponent },
    { path: 'register', component: RegistrationFormComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }

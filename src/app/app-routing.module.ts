import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { HomeProfileComponent } from './home-profile/home-profile.component';

// Content
import { HomeComponent } from './home/home.component';
import { HowItWorksComponent } from './home/how-it-works/how-it-works.component';
import { LoginComponent } from './login/login.component';
import { RegistrationFormComponent } from './registration/registration-form/registration-form.component';

const appRoutes: Routes = [
    // Home
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'home-profile', component: HomeProfileComponent, canActivate: [AuthGuard] },
    { path: 'how-it-works', component: HowItWorksComponent },
    { path: 'register', component: RegistrationFormComponent },
    { path: 'login', component: LoginComponent }
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

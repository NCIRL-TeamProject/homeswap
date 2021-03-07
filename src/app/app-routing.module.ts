import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeProfileComponent } from './home-profile/home-profile.component';


// Content
import { HomeComponent } from './home/home.component';
import { HowItWorksComponent } from './home/how-it-works/how-it-works.component';

const appRoutes: Routes = [
    // Home
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'home-profile', component: HomeProfileComponent },
    { path: 'how-it-works', component: HowItWorksComponent },
    // {path: 'register', loadChildren: 'app/registration/registration.module#RegistrationModule'}
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

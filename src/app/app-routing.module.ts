import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Infrastructure/auth/auth.guard';
import { HomeProfileComponent } from './components/home-profile/home-profile.component';

// Content
import { HomeComponent } from './components/home/home.component';
import { HowItWorksComponent } from './components/home/how-it-works/how-it-works.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationFormComponent } from './registration/registration-form/registration-form.component';
import { HomesForSwapListComponent } from './components/homes-for-swap-list/homes-for-swap-list.component';
import { HomeDetailComponent } from './components/home-detail/home-detail.component';
import { AccountComponent } from './components/account/account.component';

const appRoutes: Routes = [
    // Home
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'home-profile', component: HomeProfileComponent, canActivate: [AuthGuard] },
    { path: 'homes-for-swapping', component: HomesForSwapListComponent },
    { path: 'home-details/:id', component: HomeDetailComponent },
    { path: 'how-it-works', component: HowItWorksComponent },
    { path: 'register', component: RegistrationFormComponent },
    { path: 'login', component: LoginComponent },
    { path: 'account-details', component: AccountComponent, canActivate: [AuthGuard] }

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

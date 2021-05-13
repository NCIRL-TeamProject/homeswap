import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Infrastructure/auth/auth.guard';
import { HomeProfileComponent } from './components/home-profile/home-profile.component';

// Content
import { HomeComponent } from './components/home/home.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationFormComponent } from './registration/registration-form/registration-form.component';
import { HomesForSwapListComponent } from './components/homes-for-swap-list/homes-for-swap-list.component';
import { HomeDetailComponent } from './components/home-detail/home-detail.component';

// Account components
import { AccountComponent } from './components/account/account.component';
import { AccountRemoveComponent } from './components/account/account-remove/account-remove.component';
import { AccountUpdateComponent } from './components/account/account-update/account-update.component';
import { RequestManagementComponent } from './components/request-management/request-management.component';
import { DemoComponent } from './components/demo/demo.component';

const appRoutes: Routes = [
    // Home
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'home-profile', component: HomeProfileComponent, canActivate: [AuthGuard] },
    { path: 'homes-for-swapping/:place', component: HomesForSwapListComponent },
    { path: 'home-details/:id', component: HomeDetailComponent },
    { path: 'how-it-works', component: HowItWorksComponent },
    { path: 'register', component: RegistrationFormComponent },
    { path: 'login', component: LoginComponent },
    { path: 'account-details', component: AccountComponent, canActivate: [AuthGuard] },
    { path: 'account-remove', component: AccountRemoveComponent, canActivate: [AuthGuard] },
    { path: 'account-update', component: AccountUpdateComponent, canActivate: [AuthGuard] },
    { path: 'request-management', component: RequestManagementComponent, canActivate: [AuthGuard] },
    { path: 'demo', component: DemoComponent },
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

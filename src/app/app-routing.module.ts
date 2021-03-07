import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


// Content
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
    // Home
    {path: '', component: HomeComponent },
    {path: 'home', component: HomeComponent },

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
export class AppRoutingModule {}

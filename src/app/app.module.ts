import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { RegistrationComponent } from './registration/registration.component';

// Content
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HowItWorksComponent } from './home/how-it-works/how-it-works.component';
import { HomeProfileComponent } from './home-profile/home-profile.component';
// Shared
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    HomeProfileComponent,
    HowItWorksComponent    
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

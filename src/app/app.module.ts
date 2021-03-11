import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';

// Content
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HowItWorksComponent } from './home/how-it-works/how-it-works.component';
import { HomeProfileComponent } from './home-profile/home-profile.component';
// Shared
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';
import { BaseUrlInterceptor } from './Infrastructure/BaseUrlInterceptor';

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
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{ provide: "BASE_API_URL", useValue: environment.baseUrl },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: BaseUrlInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

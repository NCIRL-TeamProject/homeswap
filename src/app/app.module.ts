import { NgModule, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RegistrationFormComponent } from './registration/registration-form/registration-form.component';
import { AgmCoreModule, LAZY_MAPS_API_CONFIG } from '@agm/core';
import { JwtModule } from '@auth0/angular-jwt';


import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';
import { BaseUrlInterceptor } from './Infrastructure/BaseUrlInterceptor';
import { HowItWorksComponent } from './components/home/how-it-works/how-it-works.component';
import { HomeComponent } from './components/home/home.component';
import { HomeProfileComponent } from './components/home-profile/home-profile.component';
import { AuthInterceptor } from './Infrastructure/auth/auth.interceptor';
import { LoginComponent } from './components/login/login.component';
import { HomesForSwapListComponent } from './components/homes-for-swap-list/homes-for-swap-list.component';
import { HomeDetailComponent } from './components/home-detail/home-detail.component';
import { agmConfigFactory } from './Infrastructure/agmConfigFactory';

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({
  declarations: [
    AppComponent,
    RegistrationFormComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    HomeProfileComponent,
    HowItWorksComponent,
    LoginComponent,
    HomesForSwapListComponent,
    HomeDetailComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:8080", "localhost:4200", "homeswap-kickinunit.herokuapp.com"]
      }
    }),
    AgmCoreModule.forRoot({
      apiKey: 'innitialKey',
      libraries: ['places']
    })
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: agmConfigFactory,
      deps: [HttpClient, LAZY_MAPS_API_CONFIG],
      multi: true
    },
    { provide: 'BASE_API_URL', useValue: environment.baseUrl },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseUrlInterceptor,
      multi: true,
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDateAdapter, NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AgmCoreModule, LAZY_MAPS_API_CONFIG } from '@agm/core';
import { JwtModule } from '@auth0/angular-jwt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountRemoveComponent } from './components/account/account-remove/account-remove.component';
import { AccountComponent } from './components/account/account.component';
import { AlertMessagesComponent } from './components/alert-messages/alert-messages.component';
import { HomeDetailComponent } from './components/home-detail/home-detail.component';
import { HomeSwapRequestConfirmationModalComponent } from './components/home-detail/home-swap-request-confirmation-modal/home-swap-request-confirmation-modal.component';
import { SendHomeSwapRequestComponent } from './components/home-detail/send-home-swap-request/send-home-swap-request.component';
import { UserDetailsComponent } from './components/home-detail/user-details/user-details.component';
import { HomeProfileComponent } from './components/home-profile/home-profile.component';
import { PublishConfirmationModalComponent } from './components/home-profile/publish-confirmation-modal/publish-confirmation-modal.component';
import { HomeComponent } from './components/home/home.component';
import { HomesForSwapListComponent } from './components/homes-for-swap-list/homes-for-swap-list.component';
import { HomesListingFilterComponent } from './components/homes-listing-filter/homes-listing-filter.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { LoginComponent } from './components/login/login.component';
import { MapComponent } from './components/map/map.component';
import { RequestManagementComponent } from './components/request-management/request-management.component';
import { RequestMessagesComponent } from './components/request-management/request-messages/request-messages.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { agmConfigFactory } from './Infrastructure/agmConfigFactory';
import { AuthInterceptor } from './Infrastructure/auth/auth.interceptor';
import { BaseUrlInterceptor } from './Infrastructure/BaseUrlInterceptor';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { HomesListingPipePipe } from './pipes/homes-listing-pipe.pipe';
import { RequestStatusPipe } from './pipes/request-status.pipe';
import { AccountUpdateComponent } from './components/account/account-update/account-update.component';
import { CustomAdapter } from './common/date-utilities/custom-adapter';
import { CustomDateParserFormatter } from './common/date-utilities/custom-date-parser-formatter';
import { RegistrationFormComponent } from './registration/registration-form/registration-form.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ApproveOrRejectRequestComponent } from './components/request-management/approve-or-reject-request/approve-or-reject-request.component';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';

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
    HomeDetailComponent,
    AccountComponent,
    MapComponent,
    StepperComponent,
    HomesListingFilterComponent,
    HomesListingPipePipe,
    AccountRemoveComponent,
    PublishConfirmationModalComponent,
    AlertMessagesComponent,
    SendHomeSwapRequestComponent,
    HomeSwapRequestConfirmationModalComponent,
    RequestManagementComponent,
    RequestStatusPipe,
    AccountUpdateComponent,
    RequestMessagesComponent,
    UserDetailsComponent,
    ApproveOrRejectRequestComponent
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
    }),
    MatGoogleMapsAutocompleteModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    MatTabsModule,
    MatMenuModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatPaginatorModule,

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
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {

}

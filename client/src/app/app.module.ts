import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpStatusModule } from './http-status/http-status.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { IndexComponent } from './index/index.component';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  // eslint-disable-next-line prettier/prettier
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    IndexComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: (_request) => {
          return localStorage.getItem('access_token');
        },
        skipWhenExpired: true,
      },
    }),
    AppRoutingModule,
    FontAwesomeModule,
    NgbModule,
    HttpStatusModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

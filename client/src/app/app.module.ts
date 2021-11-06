import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LOCAL_STORAGE } from '@ng-web-apis/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { IndexComponent } from './index/index.component';

export function jwtOptionsFactory(storage: Storage) {
  return {
    tokenGetter: () => storage.getItem('access_token'),
    skipWhenExpired: false,
  };
}

const jwtOptionsProvider = {
  provide: JWT_OPTIONS,
  useFactory: jwtOptionsFactory,
  deps: [LOCAL_STORAGE],
};

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
    JwtModule.forRoot({ jwtOptionsProvider }),
    FontAwesomeModule,
    NgbModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
  providers: [],
})
export class AppModule {}

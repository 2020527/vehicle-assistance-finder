import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from './modules/login/login.module';
import { RegisterModule } from './modules/register/register.module';
import { FindMechanicModule } from './modules/find-mechanic/find-mechanic.module';
import { AddMechanicModule } from './modules/add-mechanic/add-mechanic.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApplicationService } from './services/application.service';
import { JWTInterceptor } from './interceptors/http.interceptor';
import { AlertModule } from '@full-fledged/alerts';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LoginModule,
    RegisterModule,
    FindMechanicModule,
    AddMechanicModule,
    AlertModule.forRoot({maxMessages: 5, timeout: 3000, positionX: 'right', positionY: 'top'}),
    NgxLoadingModule.forRoot({})
  ],
  providers: [
    ApplicationService,
    { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

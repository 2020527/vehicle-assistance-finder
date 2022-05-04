import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from './modules/login/login.module';
import { RegisterModule } from './modules/register/register.module';
import { FindMechanicModule } from './modules/find-mechanic/find-mechanic.module';
import { AddMechanicModule } from './modules/add-mechanic/add-mechanic.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LoginModule,
    RegisterModule,
    FindMechanicModule,
    AddMechanicModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

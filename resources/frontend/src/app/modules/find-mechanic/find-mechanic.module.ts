import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FindMechanicComponent } from './find-mechanic.component';
import { RouterModule } from '@angular/router';
import { RatingModule } from 'ngx-bootstrap/rating';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RequestsModule } from '../requests/requests.module';



@NgModule({
  declarations: [
    FindMechanicComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    RatingModule.forRoot(),
    ModalModule.forRoot(),
    RequestsModule
  ]
})
export class FindMechanicModule { }

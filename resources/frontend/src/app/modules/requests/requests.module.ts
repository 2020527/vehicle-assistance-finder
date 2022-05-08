import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestsComponent } from './requests.component';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';



@NgModule({
  declarations: [
    RequestsComponent,
    BookAppointmentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot()
  ],
  exports: [RequestsComponent, BookAppointmentComponent]
})
export class RequestsModule { }

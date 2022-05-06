import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddMechanicComponent } from './add-mechanic.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';



@NgModule({
  declarations: [
    AddMechanicComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ]
})
export class AddMechanicModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMechanicComponent } from './modules/add-mechanic/add-mechanic.component';
import { FindMechanicComponent } from './modules/find-mechanic/find-mechanic.component';
import { LoginComponent } from './modules/login/login.component';
import { RegisterComponent } from './modules/register/register.component';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: '/mechanics'
  },
  {
    path: 'mechanics', component: FindMechanicComponent
  },
  { path: 'add-mechanic', component: AddMechanicComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

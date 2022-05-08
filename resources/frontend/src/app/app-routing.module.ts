import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMechanicComponent } from './modules/add-mechanic/add-mechanic.component';
import { FindMechanicComponent } from './modules/find-mechanic/find-mechanic.component';
import { LoginComponent } from './modules/login/login.component';
import { RegisterComponent } from './modules/register/register.component';
import { RequestsComponent } from './modules/requests/requests.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/mechanics' },
  { path: 'requests', component: RequestsComponent },
  { path: 'mechanics', component: FindMechanicComponent },
  { path: 'update-mechanic/:id', component: AddMechanicComponent },
  { path: 'add-mechanic', component: AddMechanicComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

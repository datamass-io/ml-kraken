import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './layout/login/login.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/models/list'},
  {path: 'login', component: LoginComponent},
  {path: '**', pathMatch: 'full', redirectTo: '/models/list'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

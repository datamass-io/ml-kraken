import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { LoginComponent } from './layout/login/login.component';
import { AuthGuard } from 'src/auth/auth.guard';

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

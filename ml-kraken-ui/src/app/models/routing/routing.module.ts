import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from 'src/app/layout/main-layout/main-layout.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelsListComponent } from '../models-list/models-list.component';
import { AuthGuard } from 'src/auth/auth.guard';

const routes: Routes = [
  {
    path: 'models',
    canActivate: [AuthGuard],
    component: MainLayoutComponent,
    children: [
      {
        path: 'list',
        component: ModelsListComponent
      }
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class ModelsRoutingModule {}

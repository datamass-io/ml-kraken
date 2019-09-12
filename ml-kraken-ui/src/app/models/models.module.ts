import { NgModule } from '@angular/core';
import { ModelsRoutingModule } from './routing/routing.module';
import { ModelsListComponent } from './models-list/models-list.component';
import { UniversalComponentsModule } from '../shared/universal-components.module';
import { ModelStatusComponent } from './model-status/model-status.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [UniversalComponentsModule, CommonModule],
  declarations: [ModelsListComponent, ModelStatusComponent],
  exports: [ModelsRoutingModule],
  providers: []
})
export class ModelsModule {}

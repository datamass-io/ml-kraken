import { NgModule } from '@angular/core';
import { ModelsRoutingModule } from './routing/routing.module';
import { ModelsListComponent } from './models-list/models-list.component';
import { UniversalComponentsModule } from '../shared/universal-components.module';
import { ModelStatusComponent } from './model-status/model-status.component';
import { CommonModule } from '@angular/common';
import { ModelChartComponent } from './model-chart/model-chart.component';

@NgModule({
  imports: [UniversalComponentsModule, CommonModule],
  declarations: [
    ModelsListComponent,
    ModelStatusComponent,
    ModelChartComponent
  ],
  exports: [ModelsRoutingModule],
  providers: []
})
export class ModelsModule {}

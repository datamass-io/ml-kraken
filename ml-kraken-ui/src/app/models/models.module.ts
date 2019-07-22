import { NgModule } from '@angular/core';
import { ModelsRoutingModule } from './routing/routing.module';
import { TableModule } from 'primeng/table';
import { ModelsListComponent } from './models-list/models-list.component';
import { UniversalComponentsModule } from '../shared/universal-components.module';

@NgModule({
    imports: [
        UniversalComponentsModule
    ],
    declarations: [
        ModelsListComponent
    ],
    exports: [ModelsRoutingModule],
    providers: []
})
export class ModelsModule {
}

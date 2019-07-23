import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CrudTableComponent } from './crud-table/crud-table.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SliderModule } from 'primeng/slider';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
    imports: [
        FormsModule,
        TableModule,
        BrowserModule,
        SliderModule,
        DropdownModule,
        MultiSelectModule
    ],
    declarations: [
        CrudTableComponent
    ],
    exports: [CrudTableComponent],
    providers: []
})
export class UniversalComponentsModule {
}

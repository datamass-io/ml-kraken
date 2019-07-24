import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CrudTableComponent } from './crud-table/crud-table.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SliderModule } from 'primeng/slider';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { DataService } from './data-service.service';
import { FormDialogComponent } from './form-dialog/form-dialog.component';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
    imports: [
        FormsModule,
        TableModule,
        BrowserModule,
        SliderModule,
        DropdownModule,
        MultiSelectModule,
        DialogModule,
        InputTextModule
    ],
    declarations: [
        CrudTableComponent,
        FormDialogComponent
    ],
    exports: [CrudTableComponent, FormDialogComponent],
    providers: [DataService]
})
export class UniversalComponentsModule {
}

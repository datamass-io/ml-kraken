import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CrudTableComponent } from './crud-table/crud-table.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SliderModule } from 'primeng/slider';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormDialogComponent } from './form-dialog/form-dialog.component';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { RouterModule } from '@angular/router';
import { ConfirmationService, DialogService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DynamicDialogModule } from 'primeng/components/dynamicdialog/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { ModelStatusComponent } from '../models/model-status/model-status.component';

@NgModule({
    imports: [
        FormsModule,
        TableModule,
        BrowserModule,
        SliderModule,
        DropdownModule,
        MultiSelectModule,
        DialogModule,
        InputTextModule,
        RouterModule,
        ConfirmDialogModule,
        DynamicDialogModule,
        ToastModule
    ],
    declarations: [
        CrudTableComponent,
        FormDialogComponent,
    ],
    entryComponents: [
        ModelStatusComponent
    ],
    exports: [CrudTableComponent, FormDialogComponent],
    providers: [ConfirmationService, DialogService, MessageService]
})
export class UniversalComponentsModule {
}

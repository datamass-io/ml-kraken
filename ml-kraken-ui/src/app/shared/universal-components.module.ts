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
import { SpinnerModule } from 'primeng/spinner';
import { SelectDialogComponent } from './select-dialog/select-dialog.component';
import { CheckboxModule } from 'primeng/checkbox';

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
        ToastModule,
        SpinnerModule,
        CheckboxModule
    ],
    declarations: [
        CrudTableComponent,
        FormDialogComponent,
        SelectDialogComponent
    ],
    entryComponents: [
        ModelStatusComponent
    ],
    exports: [CrudTableComponent, FormDialogComponent, SelectDialogComponent],
    providers: [ConfirmationService, DialogService, MessageService]
})
export class UniversalComponentsModule {
}

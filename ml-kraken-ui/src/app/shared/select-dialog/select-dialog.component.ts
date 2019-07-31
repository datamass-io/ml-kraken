import { Component, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { SelectConfig } from './select-config.model';

@Component({
    selector: 'app-select-dialog',
    templateUrl: './select-dialog.component.html',
    styleUrls: ['./select-dialog.component.css']
})
export class SelectDialogComponent implements AfterViewInit {
    display = false;
    selections: string[] = [];

    @Input() config: SelectConfig;
    @Output() selectionsChanged = new EventEmitter<string[]>();

    ngAfterViewInit() {
        this.config.fields.forEach(field => {
            if (field.selected) {
                this.selections.push(field.columnName);
            }
        });
    }

    onSave() {
        this.selectionsChanged.emit(this.selections);
        this.closeDialog();
    }

    showDialog() {
        this.display = true;
    }

    closeDialog() {
        this.display = false;
    }

    selectAll() {
        this.selections = [];
        this.config.fields.forEach(field => {
            this.selections.push(field.columnName);
        });
    }

    clear() {
        this.selections = [];
    }
}

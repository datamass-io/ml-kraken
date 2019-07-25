import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormConfig } from './form-config.model';
import { DataService } from '../data-service.service';

@Component({
    selector: 'app-form-dialog',
    templateUrl: './form-dialog.component.html',
    styleUrls: ['./form-dialog.component.css']
})
export class FormDialogComponent implements OnInit {
    display = false;
    data = {};

    @Input() config: FormConfig;

    @Output() entryAdded: EventEmitter<any> = new EventEmitter<any>();

    constructor(private dataService: DataService) {}

    ngOnInit() {
        this.createDataModel();
    }

    showDialog() {
        this.display = true;
    }

    closeDialog() {
        this.display = false;
    }

    onSave() {
        if (this.config.operation === 'new') {
            this.dataService.post(this.config.postURL, this.data)
                .subscribe(resp => {
                    this.closeDialog();
                    this.entryAdded.emit();
                });
        }
    }

    createDataModel() {
        this.config.fields.forEach(field => {
            this.data[field.endpoint] = '';
        });
    }
}

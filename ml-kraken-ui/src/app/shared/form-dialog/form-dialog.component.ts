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
    id = '';

    @Input() config: FormConfig;

    @Output() entryAdded: EventEmitter<any> = new EventEmitter<any>();

    constructor(private dataService: DataService) {}

    ngOnInit() {
        this.createDataModel();
    }

    showDialog(item = null) {
        if (this.config.operation === 'edit') {
            if (item !== null) {
                this.config.fields.forEach(field => {
                    this.data[field.endpoint] = item[field.endpoint];
                });
                this.id = item.id;
            }
        }
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
                    this.resetData();
                });
        } else if (this.config.operation === 'edit') {
            console.log(this.data);
            this.dataService.put(this.config.postURL + '/' + this.id, this.data)
                .subscribe(resp => {
                    this.closeDialog();
                    this.entryAdded.emit();
                    this.resetData();
                });
        }
    }

    onCancel() {
        this.display = false;
        this.resetData();
    }

    onDelete() {
        this.dataService.delete(this.config.postURL + '/' + this.id)
            .subscribe(resp => {
                this.closeDialog();
                this.entryAdded.emit();
                this.resetData();
            });
    }

    createDataModel() {
        this.config.fields.forEach(field => {
            this.data[field.endpoint] = '';
        });
    }

    resetData() {
        this.config.fields.forEach(field => {
            this.data[field.endpoint] = '';
        });
    }
}

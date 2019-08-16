import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormConfig } from './form-config.model';
import { DataService } from '../data-service.service';
import { ConfirmationService } from 'primeng/api';

@Component({
    selector: 'app-form-dialog',
    templateUrl: './form-dialog.component.html',
    styleUrls: ['./form-dialog.component.css']
})
export class FormDialogComponent implements OnInit {
    display = false;
    data: any = {};
    id = '';

    @Input() config: FormConfig;

    @Output() entryAdded: EventEmitter<any> = new EventEmitter<any>();

    constructor(private dataService: DataService,
                private confirmationService: ConfirmationService) {}

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
        } else if (this.config.operation === 'run') {
            if (item !== null) {
                for (const key of Object.keys(item)) {
                    this.data[key] = item[key];
                }
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
                });
        } else if (this.config.operation === 'edit') {
            this.dataService.put(this.config.postURL + '/' + this.id, this.data)
                .subscribe(resp => {
                    this.closeDialog();
                    this.entryAdded.emit();
                });
        } else if (this.config.operation === 'run') {
            this.dataService.put(this.config.postURL + '/' + this.data.id, this.data)
                .subscribe(() => {
                    this.dataService.post(this.config.runPostURL, {modelId: this.data.id, action: 'run'})
                        .subscribe(() => {
                            this.closeDialog();
                            this.entryAdded.emit();
                        });
                });
        }
    }

    onCancel() {
        this.display = false;
    }

    onDelete() {
        this.dataService.delete(this.config.postURL + '/' + this.id)
            .subscribe(resp => {
                this.closeDialog();
                this.entryAdded.emit();
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

    confirm() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete?',
            accept: () => {
                this.onDelete();
            }
        });
    }

    onHide() {
        this.resetData();
    }
}

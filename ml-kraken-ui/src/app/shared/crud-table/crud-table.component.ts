import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { TableConfig } from './table-config.model';

@Component({
    selector: 'app-crud-table',
    templateUrl: './crud-table.component.html',
    styles: ['./crud-table.component.css']
})
export class CrudTableComponent implements OnInit {
    @ViewChild('table', {static: false}) table;
    cols: [{field: string, header: string}];
    data: any;

    @Input() config: TableConfig;

    ngOnInit() {
        if (this.config['subscriber'] != null) {
            this.loadData();
        }
    }

    loadData() {
        this.config['subscriber']
        .subscribe(items => {
            this.data = items;
            this.data = [...this.data];
            this.table.reset();
        });
    }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { TableConfig } from '../../shared/crud-table/table-config.model';
import { Table } from 'primeng/table';

@Component({
    selector: 'app-models-list',
    templateUrl: './models-list.component.html',
    styles: ['./models-list.component.css']
})
export class ModelsListComponent implements OnInit {

    @ViewChild('table', {static: false}) table;
    config: TableConfig;

    ngOnInit() {
        this.createTableConfig();
        console.log(this.table);
    }

    createTableConfig() {

        this.config = {
            header: 'Modele',
            cols: [
                {field: 'name', header: 'Nazwa', withFilter: false},
                {field: 'ver', header: 'Wersja'},
                {field: 'uri', header: 'URI'},
                {field: 'user', header: 'Dodał'},
                {field: 'createdAt', header: 'Data utworzenia'},
                {field: 'updatedAt', header: 'Data aktualizacji'}
            ],
            buttons: [],
            withAdd: true,
            withEdit: false,
            withDelete: true,
            withExport: false,
            paging: true,
            globalFilter: false,
            emptyMessage: 'Brak modeli',
            subscriber: null,
            globalFF: []
        };
    }
}

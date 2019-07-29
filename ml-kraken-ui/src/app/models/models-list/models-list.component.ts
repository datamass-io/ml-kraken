import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { TableConfig } from '../../shared/crud-table/table-config.model';
import { DataService } from 'src/app/shared/data-service.service';
import { CrudTableComponent } from 'src/app/shared/crud-table/crud-table.component';
import { FormConfig } from 'src/app/shared/form-dialog/form-config.model';
import { ModelStatusComponent } from '../model-status/model-status.component';

@Component({
  selector: 'app-models-list',
  templateUrl: './models-list.component.html',
  styleUrls: ['./models-list.component.css']
})
export class ModelsListComponent implements OnInit, AfterViewInit {
  constructor(private dataService: DataService) {}

  @ViewChild('table', { static: false }) table: CrudTableComponent;

  tableConfig: TableConfig = {} as any;
  dialogConfig: FormConfig;
  dialogData: any;
  itemId = '';

  ngOnInit() {
    this.createDialogConfig();
    this.createTableConfig();
  }

  ngAfterViewInit() {
  }

  createTableConfig() {
    this.tableConfig = {
      header: 'Models',
      cols: [
        {
          field: 'name',
          header: 'Name',
          type: 'string',
          withFilter: false,
          sortable: true,
          icon: undefined,
          button: undefined
        },
        {
          field: 'ver',
          header: 'Version',
          type: 'string',
          withFilter: false,
          sortable: true,
          icon: undefined,
          button: undefined
        },
        {
          field: 'uri',
          header: 'URI',
          type: 'string',
          withFilter: false,
          sortable: true,
          icon: undefined,
          button: undefined
        },
        {
          field: 'user',
          header: 'Created by',
          type: 'string',
          withFilter: false,
          sortable: true,
          icon: undefined,
          button: undefined
        },
        {
          field: 'createdAt',
          header: 'Date of creation',
          type: 'unix',
          withFilter: false,
          sortable: true,
          icon: undefined,
          button: undefined
        },
        {
          field: 'updatedAt',
          header: 'Date of update',
          type: 'unix',
          withFilter: false,
          sortable: true,
          icon: undefined,
          button: undefined
        },
        {
          field: '',
          header: 'Status',
          type: 'status',
          withFilter: false,
          sortable: false,
          icon: {
            class: 'fas fa-circle',
            style: undefined,
            withText: true,
            clickable: false,
          },
          button: undefined
        },
        {
          field: '',
          header: '',
          type: 'run',
          withFilter: false,
          sortable: false,
          icon: undefined,
          button: undefined
        },
        {
          field: '',
          header: '',
          type: 'dynamic-button',
          withFilter: false,
          sortable: false,
          icon: undefined,
          button: {
            class: 'fas fa-search',
            component: ModelStatusComponent,
            dialogHeader: 'Model statuses'
          }
        }
      ],
      buttons: [],
      errors: {
        load: ''
      },
      formDialogConfig: this.dialogConfig,
      withAdd: true,
      withEdit: true,
      withGlobalFilter: true,
      paging: true,
      emptyMessage: 'No models',
      getURL: 'https://0yctop0h6b.execute-api.eu-west-1.amazonaws.com/dev/api/v1/model-meta',
      statusGetURL: 'https://0yctop0h6b.execute-api.eu-west-1.amazonaws.com/dev/api/v1/model-status',
      runPostURL: 'https://0yctop0h6b.execute-api.eu-west-1.amazonaws.com/dev/api/v1/model-action',
      globalFF: ['name', 'ver', 'uri', 'user'],
      sortField: undefined
    };
  }

  createDialogConfig() {
    this.dialogConfig = {
      header: 'model',
      fields: [
        { label: 'Name', type: 'text', endpoint: 'name' },
        { label: 'Version', type: 'text', endpoint: 'ver' },
        { label: 'URI', type: 'text', endpoint: 'uri' },
        { label: 'User', type: 'text', endpoint: 'user' }
      ],
      width: '400px',
      height: '200px',
      operation: '',
      postURL:
        'https://0yctop0h6b.execute-api.eu-west-1.amazonaws.com/dev/api/v1/model-meta',
      withDelete: true
    };
  }
}

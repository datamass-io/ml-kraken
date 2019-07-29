import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/api';
import { TableConfig } from 'src/app/shared/crud-table/table-config.model';

@Component({
  templateUrl: './model-status.component.html',
  styleUrls: ['./model-status.component.css']
})
export class ModelStatusComponent implements OnInit {
  tableConfig: TableConfig;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit() {
    this.createTableConfig();
  }

  createTableConfig() {
    const id = this.config.data.id;

    this.tableConfig = {
      header: 'Statuses',
      cols: [
        {
          field: 'action',
          header: 'Action',
          type: 'string',
          withFilter: false,
          sortable: true,
          icon: undefined,
          button: undefined
        },
        {
          field: 'updatedAt',
          header: 'Date of action',
          type: 'unix',
          withFilter: false,
          sortable: true,
          icon: undefined,
          button: undefined
        }
      ],
      buttons: [],
      errors: {
        load: ''
      },
      formDialogConfig: undefined,
      withAdd: false,
      withEdit: false,
      withGlobalFilter: true,
      paging: true,
      emptyMessage: 'No statuses',
      getURL:
        id !== undefined && id !== null
          ? 'https://0yctop0h6b.execute-api.eu-west-1.amazonaws.com/dev/api/v1/model-status/' +
            id
          : '',
      statusGetURL: undefined,
      runPostURL: undefined,
      globalFF: ['action'],
      sortField: 'updatedAt'
    };
  }
}

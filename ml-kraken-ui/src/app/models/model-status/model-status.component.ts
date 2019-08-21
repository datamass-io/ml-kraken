import { Component, OnInit, ViewChild } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/api';
import { TableConfig } from 'src/app/shared/crud-table/table-config.model';
import { environment } from 'src/environments/environment';
import { DetailsConfig } from 'src/app/shared/details-dialog/details-config.model';
import { DetailsDialogComponent } from 'src/app/shared/details-dialog/details-dialog.component';

@Component({
  templateUrl: './model-status.component.html',
  styleUrls: ['./model-status.component.css']
})
export class ModelStatusComponent implements OnInit {
  tableConfig: TableConfig;
  dialogConfig: DetailsConfig;

  @ViewChild('dialog', {static: false}) dialog: DetailsDialogComponent;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit() {
    this.createTableConfig();
    this.createDialogConfig();
  }

  createTableConfig() {
    const id = this.config.data.id;

    this.tableConfig = {
      header: 'Logs',
      cols: [
        {
          field: 'log',
          header: 'Log',
          type: 'string',
          withFilter: false,
          sortable: true,
          hidden: false,
        },
        {
          field: 'createdAt',
          header: 'Date of log',
          type: 'unix',
          withFilter: false,
          sortable: true,
          hidden: false,
        },
        {
          field: '',
          header: '',
          type: 'view-button',
          withFilter: false,
          sortable: false,
          hidden: false,
          button: {
            class: 'fas fa-search',
            callback: (value?) => {
              this.dialog.showDialog(value.log);
            }
          }
        }
      ],
      buttons: [],
      errors: {
        load: ''
      },
      formDialogConfig: undefined,
      withAdd: false,
      withEdit: false,
      withColumnSelect: false,
      withRefresh: false,
      withGlobalFilter: true,
      paging: true,
      emptyMessage: 'No logs',
      getURL:
        id !== undefined && id !== null
          ? environment.endpointsUrl + 'model-logs/' +
            id
          : '',
      statusGetURL: undefined,
      runPostURL: undefined,
      globalFF: ['log'],
      sortField: 'createdAt'
    };
  }

  createDialogConfig() {
    this.dialogConfig = {
      header: 'Log details',
      width: '400px',
      height: '300px'
    };
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/api';
import { TableConfig } from 'src/app/shared/crud-table/table-config.model';
import { environment } from 'src/environments/environment';
import { DetailsConfig } from 'src/app/shared/details-dialog/details-config.model';
import { DetailsDialogComponent } from 'src/app/shared/details-dialog/details-dialog.component';
import { CrudTableComponent } from 'src/app/shared/crud-table/crud-table.component';

@Component({
  templateUrl: './model-status.component.html',
  styleUrls: ['./model-status.component.css']
})
export class ModelStatusComponent implements OnInit {
  tableConfig: TableConfig;
  logsTableConfig: TableConfig;
  actionsLogsTableConfig: TableConfig;
  dialogConfig: DetailsConfig;

  @ViewChild('dialog', {static: false}) dialog: DetailsDialogComponent;

  showLogs = true;
  showActions = false;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit() {
    this.createLogTableConfig();
    this.createActionsLogsTableConfig();
    this.createDialogConfig();
    this.tableConfig = this.logsTableConfig;
  }

  createLogTableConfig() {
    const id = this.config.data.id;

    this.logsTableConfig = {
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
      withSelect: {
        options: [
          { label: 'logs', value: 'logs' },
          { label: 'actions', value: 'actions' }
        ]
      },
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

  createActionsLogsTableConfig() {
    const id = this.config.data.id;

    this.actionsLogsTableConfig = {
      header: 'Actions logs',
      cols: [
        {
          field: 'body_request',
          header: 'Request body',
          type: 'object',
          withFilter: false,
          sortable: true,
          hidden: false
        },
        {
          field: 'body_response',
          header: 'Response body',
          type: 'string',
          withFilter: false,
          sortable: true,
          hidden: false
        },
        {
          field: 'diffTime',
          header: 'Time to response [ms]',
          type: 'string',
          withFilter: false,
          sortable: true,
          hidden: false
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
              this.dialog.showDialog(JSON.stringify(value.body_request), value.body_response);
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
      withSelect: {
        options: [
          { label: 'actions', value: 'actions' },
          { label: 'logs', value: 'logs' }
        ]
      },
      withGlobalFilter: true,
      paging: true,
      emptyMessage: 'No actions logs',
      getURL:
        id !== undefined && id !== null
          ? environment.endpointsUrl + 'model-action-log/' +
          id
          : '',
      statusGetURL: undefined,
      runPostURL: undefined,
      globalFF: [],
      sortField: 'createdAt',
      groupTable: {
        by: 'actionId',
        groupKey: 'actionType',
        customColumns: [
          {
            type: 'diff',
            name: 'diffTime',
            minuend: {
              field: 'createdAt',
              forOption: 'RESPONSE'
            },
            subtrahend: {
              field: 'createdAt',
              forOption: 'REQUEST'
            }
          },
          {
            type: 'split',
            name: 'body_request',
            splitColumn: {
              field: 'body',
              forOption: 'REQUEST'
            }
          },
          {
            type: 'split',
            name: 'body_response',
            splitColumn: {
              field: 'body',
              forOption: 'RESPONSE'
            }
          }
        ]
      }
    };
  }

  createDialogConfig() {
    this.dialogConfig = {
      header: 'Log details',
      width: '400px',
      height: '300px'
    };
  }

  onSelectedTableChanged(selectedTable: string) {
    if (selectedTable === 'actions') {
      this.showActions = true;
      this.showLogs = false;
    } else if (selectedTable === 'logs') {
      this.showActions = false;
      this.showLogs = true;
    }
  }
}

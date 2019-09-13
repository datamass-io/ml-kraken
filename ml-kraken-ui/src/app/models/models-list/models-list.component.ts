import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { TableConfig } from '../../shared/crud-table/table-config.model';
import { DataService } from 'src/app/shared/utils/services/data-service.service';
import { CrudTableComponent } from 'src/app/shared/crud-table/crud-table.component';
import { FormConfig } from 'src/app/shared/form-dialog/form-config.model';
import { ModelStatusComponent } from '../model-status/model-status.component';
import { environment } from 'src/environments/environment';
import { ModelChartComponent } from '../model-chart/model-chart.component';

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
          withCopy: {
            property: 'id'
          },
          sortable: true,
          hidden: false,
        },
        {
          field: 'ver',
          header: 'Version',
          type: 'string',
          withFilter: false,
          sortable: true,
          hidden: false,
        },
        {
          field: 'containerCpu',
          header: 'vCPU',
          type: 'string',
          withFilter: false,
          sortable: true,
          hidden: false,
        },
        {
          field: 'containerIP',
          header: 'IP address',
          type: 'string',
          withFilter: false,
          sortable: true,
          hidden: false,
        },
        {
          field: 'containerMemory',
          header: 'Memory [GB]',
          type: 'string',
          withFilter: false,
          sortable: true,
          hidden: false,
        },
        {
          field: 'containerPort',
          header: 'Port',
          type: 'string',
          withFilter: false,
          sortable: true,
          hidden: false,
        },
        {
          field: 'dockerImage',
          header: 'Docker image',
          type: 'string',
          withFilter: false,
          sortable: true,
          hidden: false,
        },
        {
          field: 'user',
          header: 'Created by',
          type: 'string',
          withFilter: false,
          sortable: true,
          hidden: false,
        },
        {
          field: 'createdAt',
          header: 'Date of creation',
          type: 'unix',
          withFilter: false,
          sortable: true,
          hidden: false,
        },
        {
          field: 'updatedAt',
          header: 'Date of update',
          type: 'unix',
          withFilter: false,
          sortable: true,
          hidden: false,
        },
        {
          field: '',
          header: 'Status',
          type: 'status',
          withFilter: false,
          sortable: false,
          hidden: false,
          icon: {
            class: 'fas fa-circle',
            style: undefined,
            withText: true,
            clickable: false,
          },
        },
        {
          field: '',
          header: '',
          type: 'run',
          withFilter: false,
          sortable: false,
          hidden: false,
        },
        {
          field: '',
          header: '',
          type: 'dynamic-button',
          withFilter: false,
          sortable: false,
          hidden: false,
          button: {
            class: 'fas fa-search',
            component: ModelStatusComponent,
            dialogHeader: 'Model logs'
          }
        },
        {
          field: '',
          header: '',
          type: 'dynamic-button',
          withFilter: false,
          sortable: false,
          hidden: false,
          button: {
            class: 'fas fa-chart-line',
            component: ModelChartComponent,
            dialogHeader: 'Model chart'
          }
        },
        {
          field: '',
          header: '',
          type: 'view-button',
          withFilter: false,
          sortable: false,
          hidden: false,
          button: {
            class: 'fas fa-edit',
            callback: (value?) => {
              this.table.dialog.config.operation = 'edit';
              this.table.dialog.showDialog(value);
            }
          }
        }
      ],
      buttons: [],
      errors: {
        load: ''
      },
      formDialogConfig: this.dialogConfig,
      withAdd: true,
      withEdit: false,
      withColumnSelect: true,
      withRefresh: true,
      withGlobalFilter: true,
      paging: true,
      emptyMessage: 'No models',
      getURL: environment.endpointsUrl + 'model-meta',
      statusGetURL: environment.endpointsUrl + 'model-logs',
      runPostURL: environment.endpointsUrl + 'model-action',
      globalFF: ['name', 'ver', 'uri', 'user'],
      sortField: 'createdAt'
    };
  }

  createDialogConfig() {
    this.dialogConfig = {
      header: 'model',
      fields: [
        { label: 'Name', type: 'text', endpoint: 'name' },
        { label: 'Version', type: 'text', endpoint: 'ver' },
        { label: 'User', type: 'text', endpoint: 'user' },
        { label: 'Docker image', type: 'text', endpoint: 'dockerImage' },
        { label: 'Container memory (GB)', type: 'spinner', endpoint: 'containerMemory', minValue: 1, maxValue: 3, stepValue: 0.1},
        { label: 'Container CPU (vCPU)', type: 'spinner', endpoint: 'containerCpu', minValue: 1, maxValue: 4, stepValue: 0.1},
        { label: 'Container Port', type: 'text', endpoint: 'containerPort'}
      ],
      width: '400px',
      height: '200px',
      operation: '',
      postURL:
        environment.endpointsUrl + 'model-meta',
      withDelete: true
    };
  }
}

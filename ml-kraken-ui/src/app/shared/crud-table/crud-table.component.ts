import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { TableConfig } from './table-config.model';
import { DataService } from '../data-service.service';
import { FormDialogComponent } from '../form-dialog/form-dialog.component';

@Component({
  selector: 'app-crud-table',
  templateUrl: './crud-table.component.html',
  styleUrls: ['./crud-table.component.css']
})
export class CrudTableComponent implements OnInit {
  @ViewChild('dt', { static: false }) table;
  @ViewChild('fd', { static: false }) dialog: FormDialogComponent;

  data: any;
  selectedRow: any;

  addButton = {
    icon: 'fas fa-plus',
    class: '',
    callback: () => {
      this.dialog.config.operation = 'new';
      this.dialog.showDialog();
    },
    disabled: false
  };

  editButton = {
    icon: 'fas fa-edit',
    class: '',
    callback: () => {
      this.dialog.config.operation = 'edit';
      this.dialog.showDialog(this.selectedRow);
    },
    disabled: true
  };

  @Input() config: TableConfig;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.editButton.disabled = true;
    this.dataService.get(this.config.getURL)
      .subscribe(items => {
        this.data = JSON.parse(items.body);
        this.data = [...this.data];
        if (this.config.statusGetURL !== undefined) {
          this.getStatusForData();
        }
        this.table.reset();
      });
  }

  getStatusForData() {
    (this.data as Array<any>).forEach(item => {
      let statuses: any;
      this.dataService.get(this.config.statusGetURL + '/' + item.id)
        .subscribe(resp => {
          statuses = JSON.parse(resp.body);
          statuses = [...statuses];
          if ((statuses as Array<any>).length > 0) {
            (statuses as Array<any>).sort((a, b) => (a.updatedAt > b.updatedAt) ? 1 : -1);
            Object.assign(item, {status: statuses[statuses.length - 1].action});
          }
        });
    });
  }

  preprocessColumnField(data, columnIndex): string {
    if (this.config.cols[columnIndex].type === 'unix') {
      const date = new Date(data);

      const year = date.getFullYear();
      const month = '0' + date.getMonth();
      const day = '0' + date.getDate();

      const hours = date.getHours();
      const minutes = '0' + date.getMinutes();
      const seconds = '0' + date.getSeconds();
      const formattedTime =
        year +
        '-' +
        month.substr(-2) +
        '-' +
        day.substr(-2) +
        ' ' +
        hours +
        ':' +
        minutes.substr(-2) +
        ':' +
        seconds.substr(-2);

      return formattedTime;
    } else if (this.config.cols[columnIndex].type === 'status' || this.config.cols[columnIndex].type === 'button') {
      return '';
    } else {
      return data;
    }
  }

  rowSelected() {
    this.editButton.disabled = false;
    this.dataService.selectedData.next(this.selectedRow);
  }

  rowUnselected() {
    this.editButton.disabled = true;
  }

  onIconPressed(columnType, data) {
    if (columnType === 'run') {
      if (data.status === 'scheduled to run') {
        this.dataService.post(this.config.runPostURL, {modelId: data.id, action: 'stop'})
        .subscribe(resp => {
          this.loadData();
        });
      } else {
        this.dataService.post(this.config.runPostURL, {modelId: data.id, action: 'run'})
        .subscribe(resp => {
          this.loadData();
        });
      }
    }
  }
}

import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { TableConfig } from './table-config.model';
import { DataService } from '../data-service.service';
import { FormDialogComponent } from '../form-dialog/form-dialog.component';
import { DialogService } from 'primeng/api';
import { SelectDialogComponent } from '../select-dialog/select-dialog.component';
import { SelectConfig } from '../select-dialog/select-config.model';

@Component({
  selector: 'app-crud-table',
  templateUrl: './crud-table.component.html',
  styleUrls: ['./crud-table.component.css']
})
export class CrudTableComponent implements OnInit {
  @ViewChild('dt', { static: false }) table;
  @ViewChild('fd', { static: false }) dialog: FormDialogComponent;
  @ViewChild('csd', { static: false }) columnSelectDialog: SelectDialogComponent;

  data: any;
  selectedRow: any;
  columnSelectDialogConfig: SelectConfig;
  selectedTable: string;

  addButton = {
    icon: 'fas fa-plus',
    class: 'editButton',
    callback: () => {
      this.dialog.config.operation = 'new';
      this.dialog.showDialog();
    },
    disabled: false
  };

  editButton = {
    icon: 'fas fa-edit',
    class: 'editButton',
    callback: () => {
      this.dialog.config.operation = 'edit';
      this.dialog.showDialog(this.selectedRow);
    },
    disabled: true
  };

  columnSelectButton = {
    icon: 'fas fa-cog',
    class: 'settingButton',
    callback: () => {
      this.columnSelectDialog.showDialog();
    },
    disabled: false
  };

  refreshButton = {
    icon: 'fas fa-sync',
    class: 'settingButton',
    callback: () => this.loadData(),
    disabled: false
  };

  @Input() config: TableConfig;

  @Output() selectedTableChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor(private dataService: DataService, public dialogService: DialogService) {}

  ngOnInit() {
    this.loadData();
    if (this.config.withColumnSelect) {
      this.createSelectColumnDialogConfig();
    }
  }

  loadData() {
    this.editButton.disabled = true;
    this.dataService.get(this.config.getURL)
      .subscribe(items => {

        const parsedItems = JSON.parse(items.body);

        if (this.config.groupTable !== undefined && this.config.groupTable !== null) {

          if (this.config.sortField !== undefined) {
            (parsedItems as Array<any>).sort((a, b) => (a[this.config.sortField] > b[this.config.sortField]) ? -1 : 1);
          }

          const groupedItems: any[] = [];
          (parsedItems as Array<any>).forEach(parsedItem => {
            const index = groupedItems.findIndex(item => {
              return item[this.config.groupTable.by] === parsedItem[this.config.groupTable.by];
            });

            const data = {};

            this.config.groupTable.customColumns.forEach(customColumn => {
              if (customColumn.type === 'split') {
                if (customColumn.splitColumn.forOption.toUpperCase() === parsedItem.actionType.toUpperCase()) {
                  data[customColumn.name] = parsedItem[customColumn.splitColumn.field];
                }
              } else if (customColumn.type === 'diff') {
                if (customColumn.minuend.forOption.toUpperCase() === parsedItem.actionType.toUpperCase()) {
                  Object.assign(data, {minuend: parsedItem[customColumn.minuend.field]});
                } else if (customColumn.subtrahend.forOption.toUpperCase() === parsedItem.actionType.toUpperCase()) {
                  Object.assign(data, {subtrahend: parsedItem[customColumn.subtrahend.field]});
                }
              }
            });

            if (index === -1) {
              const groupedItem: any = {};
              groupedItem[this.config.groupTable.by] = parsedItem[this.config.groupTable.by];
              groupedItem.data = data;
              groupedItems.push(groupedItem);
            } else {
              Object.assign(groupedItems[index].data, data);
              const groupedItemData = groupedItems[index].data;
              if (groupedItemData.minuend !== undefined && groupedItemData.minuend !== null
                && groupedItemData.subtrahend !== undefined && groupedItemData.subtrahend !== null) {
                  let diff = groupedItemData.minuend - groupedItemData.subtrahend;
                  diff = diff;
                  delete groupedItems[index].data.minuend;
                  delete groupedItems[index].data.subtrahend;
                  Object.assign(groupedItems[index].data, {diffTime: diff});
              }
            }
          });

          groupedItems.map(groupedItem => {
            delete groupedItem.id;
            const groupedItemData = groupedItem.data;
            delete groupedItem.data;
            Object.assign(groupedItem, groupedItemData);
          });

          console.log(groupedItems);
          this.data = groupedItems;
          this.data = [...this.data];
          this.table.reset();
        } else {
          this.data = parsedItems;
          this.data = [...this.data];
          if (this.config.sortField !== undefined) {
            (this.data as Array<any>).sort((a, b) => (a[this.config.sortField] > b[this.config.sortField]) ? -1 : 1);
          }
          if (this.config.statusGetURL !== undefined) {
             // this.getStatusForData();
          }
          this.table.reset();
        }
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
      const month = '0' + (date.getMonth() + 1);
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
    } else if (this.config.cols[columnIndex].type === 'object') {
      let stringifiedData = JSON.stringify(data);
      if (stringifiedData !== undefined) {
        if (stringifiedData.length >= 100) {
          stringifiedData = stringifiedData.substr(0, 100);
          stringifiedData += ' ...';
        }
      }
      return stringifiedData;
    } else {
      if (typeof(data) === 'string') {
        if (data.length >= 100) {
          data = data.substr(0, 100);
          data += ' ...';
        }
      }
      return data;
    }
  }

  rowSelected() {
    console.log(this.selectedRow);
    this.editButton.disabled = false;
  }

  rowUnselected() {
    this.editButton.disabled = true;
  }

  onIconPressed(columnType, data) {
    if (columnType === 'run') {
      if (data.status === 'RUNNING') {
        this.dataService.post(this.config.runPostURL, {modelId: data.id, action: 'stop'})
                        .subscribe(resp => {
                          this.loadData();
                        });
      } else if (data.status === 'STOPPED') {
        this.dataService.post(this.config.runPostURL, {modelId: data.id, action: 'run'})
                        .subscribe(resp => {
                          this.loadData();
                        });
      }
    }
  }

  showDynamicDialog(id: string, buttonConfig: any) {
    const ref = this.dialogService.open(buttonConfig.component, {
      data: {
        id
      },
      header: buttonConfig.dialogHeader,
      width: '70%'
    });
  }

  createSelectColumnDialogConfig() {
    const fields = [];

    this.config.cols.forEach(column => {
      if (column.field !== '') {
        fields.push({columnName: column.field, selected: !column.hidden});
      }
    });

    this.columnSelectDialogConfig = {
      header: 'Show/Hide Columns',
      fields,
      width: '200px',
      height: '200px'
    };
  }

  onColumnsSelectionChanged(selections: string[]) {
    this.config.cols.map(col => {
      if (!selections.includes(col.field) && col.field !== '') {
        col.hidden = true;
      } else {
        col.hidden = false;
      }
    });
  }

  onSelectedTableChanged() {
    this.selectedTableChanged.emit(this.selectedTable);
  }
}

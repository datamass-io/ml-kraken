import { FormConfig } from '../form-dialog/form-config.model';
import { Type } from '@angular/core';

export interface TableConfig {
  header: string;
  cols: {
    field: string;
    header: string;
    type: string;
    withFilter: boolean;
    sortable: boolean;
    hidden: boolean;
    icon: {
      class: string;
      style: { color: string };
      withText: boolean;
      clickable: boolean;
    };
    button: {
      class: string;
      component: Type<any>;
      dialogHeader: string;
    }
  }[];
  buttons:
    {
      label: string;
      class: string;
      callback: () => void;
      icon: string;
      disabled: boolean;
    }[];
  formDialogConfig: FormConfig;
  runDialogConfig: FormConfig;
  withAdd: boolean;
  withEdit: boolean;
  withColumnSelect: boolean;
  withRefresh: boolean;
  withGlobalFilter: boolean;
  errors: {
    load: string;
  };
  paging: boolean;
  emptyMessage: string;
  getURL: string;
  statusGetURL: string;
  runPostURL: string;
  globalFF: string[];
  sortField: string;
}

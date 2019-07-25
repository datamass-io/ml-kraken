import { Observable } from 'rxjs';
import { FormConfig } from '../form-dialog/form-config.model';

export interface TableConfig {
  header: string;
  cols: {
    field: string;
    header: string;
    type: string;
    withFilter: boolean;
    sortable: boolean;
    icon: {
      class: string;
      style: { color: string };
      withText: boolean;
      clickable: boolean;
    };
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
  withAdd: boolean;
  withEdit: boolean;
  withGlobalFilter: boolean;
  errors: {
    load: string;
  };
  paging: boolean;
  emptyMessage: string;
  getURL: string;
  statusGetURL: string;
  globalFF: string[];
}

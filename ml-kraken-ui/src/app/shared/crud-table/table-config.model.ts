import { Observable } from 'rxjs';

export interface TableConfig {
  header: string;
  cols: { field: string; header: string; type: string; withFilter: boolean }[];
  buttons: [
    {
      label: string;
      class: string;
      callback: () => void;
      icon: string;
      disabled: boolean;
    }
  ];
  withAdd: boolean;
  withEdit: boolean;
  withDelete: boolean;
  withExport: boolean;
  withGlobalFilter: boolean;
  errors: {
    load: string;
  };
  paging: boolean;
  emptyMessage: string;
  subscriber: Observable<any>;
  globalFF: [];
}

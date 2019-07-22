import { Subscription, Observable } from 'rxjs';

export class TableConfig {
  constructor(
    header: string,
    cols: [{ field: string; header: string; withFilter: boolean }],
    buttons: [
      {
        label: string;
        class: string;
        callback: () => {};
        icon: string;
        disabled: boolean;
      }
    ],
    withAdd: boolean,
    withEdit: boolean,
    withDelete: boolean,
    withExport: boolean,
    errors: {
      load: string;
    },
    paging: boolean,
    globalFilter: boolean,
    emptyMessage: string,
    subscriber: Observable<any>,
    globalFF: []
  ) {}
}

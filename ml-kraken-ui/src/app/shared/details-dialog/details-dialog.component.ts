import { Component, Input } from '@angular/core';
import { DetailsConfig } from './details-config.model';

@Component({
    selector: 'app-details-dialog',
    templateUrl: './details-dialog.component.html',
    styleUrls: ['./details-dialog.component.css']
})
export class DetailsDialogComponent {
    display = false;
    text: string;

    @Input() config: DetailsConfig;

    showDialog(text: string) {
        this.text = text;
        this.display = true;
    }

    closeDialog() {
        this.display = false;
    }
}

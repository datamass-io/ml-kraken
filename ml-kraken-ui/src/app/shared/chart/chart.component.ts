import { Component, Input } from '@angular/core';
import { ChartConfig } from './chart.model';

@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.css']
})
export class ChartComponent {
    @Input() config: ChartConfig;
}

import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/api';
import { ChartConfig } from 'src/app/shared/chart/chart.model';
import { DataService } from 'src/app/shared/utils/services/data-service.service';
import { environment } from 'src/environments/environment';
import { parseUnix } from '../../shared/utils/functions/parsers.functions';

@Component({
    templateUrl: './model-chart.component.html',
    styleUrls: ['./model-chart.component.css']
})
export class ModelChartComponent implements OnInit {

    chartConfig: ChartConfig;
    chartData: ChartConfig['data'];

    constructor(
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
        private dataService: DataService
    ) {}

    ngOnInit() {
        this.getData();
    }

    createChartConfig() {
        this.chartConfig = {
            type: 'line',
            data: this.chartData,
            options: {
                title: {
                    display: true,
                    text: 'Time to response over time',
                    fontSize: 16
                },
                legend: {
                    position: 'top'
                }
            }
        };
    }

    getData() {
        const id = this.config.data.id;

        this.dataService.get(environment.endpointsUrl + 'model-action-log/' + id).subscribe(res => {
            const data = JSON.parse(res.body);

            let groupedData: any[] = [];
            (data as Array<any>).forEach(item => {
                const index = groupedData.findIndex(groupedItem => {
                    return groupedItem.actionId === item.actionId;
                });

                if (index === -1) {
                    if (item.actionType === 'REQUEST') {
                        groupedData.push({actionId: item.actionId, requestTime: item.createdAt});
                    } else if (item.actionType === 'RESPONSE') {
                        groupedData.push({actionId: item.actionId, responseTime: item.createdAt});
                    }
                } else {
                    if (item.actionType === 'REQUEST') {
                        groupedData[index].requestTime = item.createdAt;
                        const timeDiff = groupedData[index].responseTime - groupedData[index].requestTime;
                        delete groupedData[index].responseTime;
                        groupedData[index].time = timeDiff;
                    } else if (item.actionType === 'RESPONSE') {
                        const timeDiff = item.createdAt - groupedData[index].requestTime;
                        groupedData[index].time = timeDiff;
                    }
                }
            });
            groupedData = groupedData.filter(item => {
                return item.time !== undefined && item.time !== null;
            });

            groupedData.sort((a, b) => {
                return a.requestTime - b.requestTime;
            });

            const labels: string[] = [];
            const values: number[] = [];

            groupedData.forEach(item => {
                labels.push(parseUnix(item.requestTime));
                values.push(item.time);
            });

            const dataset: {label: string; data: number[], fill: boolean, borderColor: string} = {
                label: 'Response time [ms]',
                data: values,
                fill: true,
                borderColor: '#4bc0c0'
            };

            this.chartData = {
                labels,
                datasets: [
                    dataset
                ]
            };

            this.createChartConfig();
        });
    }
}

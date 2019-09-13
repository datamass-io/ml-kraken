export interface ChartConfig {
    type: string;
    data: {
        labels: string[];
        datasets: {
            label: string;
            data: number[];
            fill: boolean;
            borderColor?: string;
        }[];
    };
    options?: {
        title?: {
            display: boolean;
            text: string;
            fontSize: number;
        },
        legend?: {
            position: string;
        }
    };
    width?: string;
    height?: string;
}

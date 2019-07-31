export interface FormConfig {
    header: string;
    fields: {
        label: string,
        type: string,
        endpoint: string,
        minValue?: number,
        maxValue?: number,
        stepValue?: number
    }[];
    width: string;
    height: string;
    operation: string;
    postURL: string;
    runPostURL?: string;
    withDelete: boolean;
}

export interface FormConfig {
    header: string;
    fields: {
        label: string,
        type: string,
        endpoint: string
    }[];
    width: string;
    height: string;
    operation: string;
    postURL: string;
}

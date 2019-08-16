export interface SelectConfig {
    header: string;
    fields: {
        columnName: string;
        selected: boolean;
    }[];
    width: string;
    height: string;
}

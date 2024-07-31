export interface Tooltip {
    enabled: boolean; // default true
    position?: string;
    backgroundColor?: string;
    title?: {
        enabled?: boolean; // default false
        text?: string; // If undefined we use the X axis value
        prefix?: string;
        fontSize?: string;
        fontColor?: string;
    };
}

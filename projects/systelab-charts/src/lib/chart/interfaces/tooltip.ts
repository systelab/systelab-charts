export interface Tooltip {
    enabled: boolean; // default true
    position: string;
    backgroundColor: string;
    title: {
        text: string; // content
        fontSize: string;
        fontColor: string;
    };
    label: string;
    afterLabel: string;
    body: {
        fontSize: string;
        fontColor: string;
    };
    border?: {
        color?: string;
        width?: string;
    };
}

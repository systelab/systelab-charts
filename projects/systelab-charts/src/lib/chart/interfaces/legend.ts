export interface Legend {
    enabled?: boolean; // display
    title?: {
        enabled: boolean; // display
        text: string;
        color?: string;
        font?: {
            size?: number;
            style?: string;
            weight?: string;
        };
    };
    labels?: {
        enabled: boolean; // usePointStyle
        pointStyle: LegendPointStyle;
    };
    position?: LegendPosition;
    type?: LegendType; // default ChartJs election
}

export enum LegendPointStyle {
    circle = 'circle',
    cross = 'cross',
    crossRot = 'crossRot',
    dash = 'dash',
    line = 'line',
    rect = 'rect',
    rectRounded = 'rectRounded',
    rectRot = 'rectRot',
    star = 'star',
    triangle = 'triangle',
}


export enum LegendPosition {
    top = 'top',
    right = 'right',
    bottom = 'bottom',
    left = 'left',
    chartArea = 'chartArea',
}

export enum LegendType {
    line = 'line',
}

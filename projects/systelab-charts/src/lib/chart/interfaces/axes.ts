export interface Axes {
    isHorizontal?: boolean;
    mainAxis?: string; // default x
    dataAxes?: Axis;
}

export interface Axis {
    [id: string]: {
        title?: {
            display: boolean;
            text: string;
        };
        type?: string; // enum
        position?: string; // enum
        distribution?: string; // time
        time?: {
            unit: string;
            minUnit: string;
        };
        stacked?: boolean;
        min?: number;
        max?: number;
        ticks?: Ticks;
        border?: {
            drawBorder: boolean;
        };
        grid?: {
            display: boolean;
        };
    };
}

export interface Ticks {
    display?: boolean; // default true
    min?: number;
    max?: number;
    stepSize?: number;
    autoSkip?: boolean;
    initialTick?: boolean; // default true
    finalTick?: boolean; // default true
}

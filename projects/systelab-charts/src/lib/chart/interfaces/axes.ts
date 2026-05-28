import { Locale } from "date-fns";

export interface Axes {
    isHorizontal?: boolean;
    mainAxis?: 'x' | 'y'; // default x
    dataAxes?: Axis;
}

export interface Axis {
    [id: string]: AxisContent;
}

type TimeUnit =
    | "millisecond"
    | "second"
    | "minute"
    | "hour"
    | "day"
    | "week"
    | "month"
    | "quarter"
    | "year";

type TimeDisplayFormats = Partial<Record<TimeUnit, string>>;

export interface AxisContent {
    title?: {
        display: boolean;
        text: string;
    };
    type?: string; // enum
    position?: string; // enum
    distribution?: string; // time
    time?: {
        unit?: TimeUnit;
        minUnit?: TimeUnit;
        displayFormats?: TimeDisplayFormats;
    };
    stacked?: boolean;
    min?: number;
    max?: number;
    ticks?: Ticks;
    border?: {
        drawBorder?: boolean;
    };
    grid?: {
        display: boolean;
    };
    adapters?:{
        date: {
            locale: Locale;
        }
    }
}

export interface Ticks {
    display?: boolean; // default true
    min?: number;
    max?: number;
    stepSize?: number;
    autoSkip?: boolean;
    initialTick?: boolean; // default true
    finalTick?: boolean; // default true
    maxTicksLimit?: number;
    source?: 'auto' | 'data' | 'labels';
    minRotation?: number;
    maxRotation?: number;
    includeBounds?: boolean;
    callback?: (val, index) => string | string[];
}

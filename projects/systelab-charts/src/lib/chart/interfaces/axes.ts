import { Locale } from 'date-fns';

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
        finalTick?: boolean;
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

export interface TickItem {
    value: number;
    label?: string | string[];
    major?: boolean;
}

export interface FinalTickScale {
    ticks?: TickItem[];
    max: number;
    _gridLineItems?: unknown;
    options?: {
        reverse?: boolean;
        afterFit?: (scale: FinalTickScale) => void;
        beforeBuildTicks?: (scale: FinalTickScale) => void;
        ticks?: {
            maxTicksLimit?: number;
        };
    };
}

export type AxisWithFitHook = AxisContent & {
    afterFit?: (scale: FinalTickScale) => void;
    beforeBuildTicks?: (scale: FinalTickScale) => void;
};

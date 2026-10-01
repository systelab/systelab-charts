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

export const SCALE_TYPE = {
    LINEAR: 'linear',
    LOGARITHMIC: 'logarithmic',
    CATEGORY: 'category',
    TIME: 'time',
    TIMESERIES: 'timeseries',
} as const;

export type TickScaleType = (typeof SCALE_TYPE)[keyof typeof SCALE_TYPE];

interface GridLineItem {
    tx1: number;
    ty1: number;
    tx2: number;
    ty2: number;
    width: number;
    color: string;
    borderDash?: number[];
    borderDashOffset?: number;
}

interface ChartJsInternalScaleOptions {
    _gridLineItems?: GridLineItem[];
}

interface ChartJsTimeScaleOptions {
    _adapter?: {
        format?: (timestamp: number, format: string) => string;
        startOf?: (timestamp: number, unit: TimeUnit) => number;
        endOf?: (timestamp: number, unit: TimeUnit) => number;
    };
    _unit?: TimeUnit;
}

export interface FinalTickScale
    extends ChartJsInternalScaleOptions, ChartJsTimeScaleOptions {
    type?: TickScaleType;
    ticks?: TickItem[];
    min: number;
    max: number;
    format?: (value: number, format?: string) => string;
    options?: {
        reverse?: boolean;
        time?: {
            unit?: TimeUnit;
            minUnit?: TimeUnit;
            displayFormats?: TimeDisplayFormats;
        };
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

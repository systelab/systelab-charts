import { BorderStyle, ChartType } from './chart-configuration';

export interface BaseDataset {
    label?: string;
    type?: ChartType;
    backgroundColor?: string | number[][];
    isGradient?: boolean;
    fill?: boolean;
    yAxisID?: string;
    datalabels?: {
        align: string;
        anchor: string;
    };
    border?: BorderStyle | BorderStyle[] | null;
}

export interface LineDataset extends BaseDataset {
    data: number[];
    border?: BorderStyle | BorderStyle[];
}

export interface BarDataset extends BaseDataset {
    data: number[];
    border?: BorderStyle | BorderStyle[];
}

export interface BubbleDataset extends BaseDataset {
    data: BubblePoint[];
}

export interface TimeDataset extends BaseDataset {
    data: TimePoint[];
}

export interface BubblePoint {
    x: number;
    y: number;
    r: number;
}

export interface TimePoint {
    x: string | Date;
    y: number;
}

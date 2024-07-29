import { ChartType } from './chart-configuration';

export type Dataset = LineDataset | BarDataset | BubbleDataset | TimeDataset | ScatterDataset;

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
    pointRadius?: number;
}


// Line dataset
export interface LineDataset extends BaseDataset {
    data: number[];
    border?: LineDatasetBorderStyle | LineDatasetBorderStyle[];
}

export interface LineDatasetBorderStyle {
    color?: string | number[];
    width?: number;
    dash?: number[];
}


// Bar dataset
export interface BarDataset extends BaseDataset {
    data: number[];
    border?: BarDatasetBorderStyle | BarDatasetBorderStyle[];
}

export interface BarDatasetBorderStyle {
    width?: number;
    color?: string | number[];
    radius?: number;
}


// Bubble dataset
export interface BubbleDataset extends BaseDataset {
    data: BubblePoint[];
    border?: BubbleDatasetBorderStyle | BubbleDatasetBorderStyle[];
}

export interface BubblePoint {
    x: number;
    y: number;
    r: number;
}

export interface BubbleDatasetBorderStyle {
    width?: number;
    color?: string | number[];
}


// Time dataset
export interface TimeDataset extends BaseDataset {
    data: TimePoint[];
    border?: TimeDatasetBorderStyle | TimeDatasetBorderStyle[];
}

export interface TimePoint {
    x: string | Date;
    y: number;
}

export interface TimeDatasetBorderStyle {
    width?: number;
    color?: string | number[];
}


// Scatter dataset
export interface ScatterDataset extends BaseDataset {
    data: ScatterPoint[];
    showLine: boolean;
    border?: ScatterDatasetBorderStyle | ScatterDatasetBorderStyle[];
}

export interface ScatterPoint {
    x: number;
    y: number;
}

export interface ScatterDatasetBorderStyle {
    color?: string | number[];
    width?: number;
    dash?: number[];
}

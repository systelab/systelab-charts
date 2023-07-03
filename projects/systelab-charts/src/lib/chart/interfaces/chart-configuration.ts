import { Axes } from './axes';
import { BarDataset, BubbleDataset, LineDataset, TimeDataset } from './dataset';
import { BoxAnnotation, LineAnnotation } from './annotation';
import { Tooltip } from './tooltip';
import { Legend } from './legend';

export interface ChartConfiguration {
    type: ChartType;
    labels?: (string | Date)[];
    datasets: (LineDataset | BarDataset | BubbleDataset | TimeDataset)[];
    annotations?: (LineAnnotation | BoxAnnotation)[];
    tooltips?: Tooltip;
    legend?: Legend;
    grid?: {
        enabled: boolean; // pie and doughnut
        limits: {
            x: {
                max: number;
                min: number;
            };
            y: {
                max: number;
                min: number;
            };
        };
    };
    axes?: Axes;
    options?: {
        responsive?: boolean;
        line?: {
            tension: number; // elements.line.tension
        };
        maintainAspectRatio?: boolean;
        animations?: {
            duration: number;
        };
        interactions?: {
            intersect: boolean;
            mode: InteractionMode; // default index
        };
    };
}

export interface BorderStyle {
    width?: number;
    color?: string;
    radius?: number;
    dash?: number[];
}

export enum ChartType {
    line = 'line',
    bar = 'bar',
    pie = 'pie',
    radar = 'radar',
    doughnut = 'doughnut',
    polarArea = 'polarArea',
    scatter = 'scatter',
    bubble = 'bubble',
}

export enum InteractionMode {
    point = 'point',
    nearest = 'nearest',
    index = 'index',
    dataset = 'dataset',
    x = 'x',
    y = 'y',
}

import { Axes } from './axes';
import { Dataset } from './dataset';
import { AnnotationTypes } from './annotation';
import { Tooltip } from './tooltip';
import { Legend } from './legend';
import { Context } from 'chartjs-plugin-datalabels';

export interface ChartConfiguration {
    type: ChartType;
    labels?: {
        data: (string | Date)[];
        skipItems?: number; // number the items to be skipped between labels
        showOnlyIntegers?: boolean; // only show labels if there are no decimals
    };
    datasets: Dataset[];
    annotations?: AnnotationTypes[];
    tooltip?: Tooltip;
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
        interaction?: {
            intersect: boolean;
            mode: InteractionMode; // default index
        };
        datalabels?: {
            display: boolean | DatalabelsDisplayFunction;
            formatter: DatalabelsFormatterFunction;
            font?: {
                color: string;
                weight: string;
            };
        };
    };
}


export type ChartJSContext = Context;
export type DatalabelsFormatterFunction = (value, context: ChartJSContext) => number | string;
export type DatalabelsDisplayFunction = (context: ChartJSContext) => boolean;

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

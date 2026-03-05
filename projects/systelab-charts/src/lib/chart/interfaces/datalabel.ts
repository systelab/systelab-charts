import { ChartJSContext } from './chart-configuration';

export type DatalabelAlign = 'start' | 'center' | 'end' | 'top' | 'bottom' | 'left' | 'right';
export type DatalabelAnchor = 'start' | 'center' | 'end';

export type DatalabelsFormatterFunction = (value, context: ChartJSContext) => number | string;
export type DatalabelsDisplayFunction = (context: ChartJSContext) => boolean;

export interface Datalabels {
    display: boolean | DatalabelsDisplayFunction;
    formatter: DatalabelsFormatterFunction;
    align?: DatalabelAlign;
    anchor?: DatalabelAnchor;
    font?: {
        color: string;
        weight: string;
    };
}

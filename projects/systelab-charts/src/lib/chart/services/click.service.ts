import { Injectable } from '@angular/core';
import * as ChartJS from 'chart.js';
import { ClickPoint, OnClickCallbackFunction } from '../interfaces';

export type ChartJSOnClick = (event: ChartJS.ChartEvent, elements: ChartJS.ActiveElement[], chart: ChartJS.Chart) => void;

@Injectable({
    providedIn: 'root',
})
export class ClickService {

    public map(userOnClick: OnClickCallbackFunction): ChartJSOnClick {
        if (userOnClick) {
            return (event: ChartJS.ChartEvent, elements: ChartJS.ActiveElement[], chart: ChartJS.Chart) => {
                const clickPoint: ClickPoint = this.toClickPoint(event, chart);
                userOnClick(clickPoint);
            };
        }
    }

    private toClickPoint(event: ChartJS.ChartEvent, chart: ChartJS.Chart): ClickPoint {
        return {
            x: chart.scales.x.getValueForPixel(event.x),
            y: chart.scales.y.getValueForPixel(event.y)
        };
    }
}

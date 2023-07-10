import { Injectable } from '@angular/core';
import { ChartConfiguration } from '../interfaces';
import { LinearScale, LogarithmicScale, TimeScale } from 'chart.js';

@Injectable({
    providedIn: 'root',
})
export class AxesService {

    public mapConfiguration(configuration: ChartConfiguration): (LinearScale | LogarithmicScale | TimeScale | undefined) {
        const { labels, axes } = configuration;
        const scales = axes?.dataAxes ?? {};

        if (scales && !('x' in scales)) {
            scales.x = {};
        }
        if (scales && !('ticks' in scales.x)) {
            scales.x.ticks = {};
        }
        if (scales && labels?.skipItems) {
            let count = 0;
            scales.x.ticks.callback = (value, index): string => {
                const skipItems = labels.skipItems ?? 0;
                const labelValue = configuration.labels.data[index] ? configuration.labels.data[index] : value;
                count = index % skipItems;
                return skipItems ? (count === 0) ? labelValue : null : labelValue;
            };
        }
        return scales as unknown as (LinearScale | LogarithmicScale | TimeScale | undefined);
    }
}

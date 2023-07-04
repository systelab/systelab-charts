import { Injectable } from '@angular/core';
import { Axes } from '../interfaces';
import { LinearScale, LogarithmicScale, TimeScale } from 'chart.js';

@Injectable({
    providedIn: 'root',
})
export class AxesService {

    public mapConfiguration(axes: Axes): (LinearScale | LogarithmicScale | TimeScale | undefined) {
        if (!axes) {
            return undefined;
        }
        const scales = axes.dataAxes;
        return scales as unknown as (LinearScale | LogarithmicScale | TimeScale | undefined);
    }
}

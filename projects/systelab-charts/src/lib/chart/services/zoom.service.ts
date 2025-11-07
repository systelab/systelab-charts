import { Injectable } from '@angular/core';
import { ChartConfiguration } from '../interfaces';

@Injectable({
    providedIn: 'root',
})
export class ZoomService {

    public mapZoom(chartConfiguration: ChartConfiguration) {
        return chartConfiguration.options.zoom;
    }
}
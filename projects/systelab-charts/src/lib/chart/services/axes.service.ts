import { Injectable } from '@angular/core';
import { Axes } from '../interfaces';

@Injectable({
    providedIn: 'root',
})
export class AxesService {

    public mapConfiguration(axes: Axes) {
        if (!axes) {
            return {};
        }
        const scales = axes.dataAxes;
        return scales;
    }
}

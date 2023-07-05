import { Injectable } from '@angular/core';
import { Legend, LegendAlign, LegendPosition } from '../interfaces';

@Injectable({
    providedIn: 'root',
})
export class LegendService {

    public mapLegend(legend: Legend) {
        return {
            display: legend?.enabled ?? true,
            ...(legend?.title && {
                title: {
                    enabled: legend.title.enabled,
                    text: legend.title.text,
                }
            }),
            position: legend?.position ?? LegendPosition.top,
            align: legend?.align ?? LegendAlign.center,
            labels: {
                usePointStyle: legend?.labels?.enabled ?? false,
                pointStyle: legend?.labels?.pointStyle ?? undefined,
            },
            ...(legend?.disabledClickEvent && {onClick: () => {}}),
        };
    }
}

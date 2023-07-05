import { Injectable } from '@angular/core';
import { ChartConfiguration } from '../interfaces';

@Injectable({
    providedIn: 'root',
})
export class TooltipService {

    public mapTooltip(chartConfiguration: ChartConfiguration) {
        const { tooltip } = chartConfiguration;
        const { enabled: pointStyleEnabled} = chartConfiguration.legend?.labels ?? { enabled: false};
        return {
            enabled: tooltip?.enabled ?? true,
            usePointStyle: pointStyleEnabled,
        };
    }
}

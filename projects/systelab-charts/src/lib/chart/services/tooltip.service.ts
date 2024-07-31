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
            callbacks: {
                title: (tooltipItems) => {
                    const enabled = tooltip?.title?.enabled ?? false;
                    if (!enabled) {
                        return null;
                    }

                    let title = tooltip?.title?.text ?? undefined;
                    const prefix = tooltip?.title?.prefix ?? undefined;
                    if (!title) {
                        title = tooltipItems[0].label;
                    }
                    return prefix ? `${prefix.trim()} ${title.trim()}` : title.trim();
                }
            }
        };
    }
}

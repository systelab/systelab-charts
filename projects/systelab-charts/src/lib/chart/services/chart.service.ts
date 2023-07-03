import { Injectable } from '@angular/core';
import { ChartConfiguration } from '../interfaces';
import { chartDefaultValues } from '../chart-default-values';
import { AxesService } from './axes.service';

@Injectable({
    providedIn: 'root',
})
export class ChartService {

    constructor(private readonly axesService: AxesService) {
    }

    public mapConfiguration(configuration: ChartConfiguration) {
        const outputConfiguration = this.mapBasicInformation(configuration);
        const axes = this.axesService.mapConfiguration(configuration.axes);
        const indexAxis = configuration.axes ? configuration.axes.mainAxis : null;
        return {
            ...outputConfiguration,
            options: {
                ...outputConfiguration.options,
                indexAxis,
                scales: axes,
            },
        };
    }

    private mapBasicInformation(configuration: ChartConfiguration) {
        // Howto implement the fill flag
        const chartConfiguration = {
            ...chartDefaultValues,
            ...configuration
        };

        const { options:{line, datalabels}} = chartConfiguration;
        return {
            type: chartConfiguration.type,
            data: {
                labels: chartConfiguration.labels,
                datasets: chartConfiguration.datasets,
            },
            options: {
                elements: {
                    line: {
                        tension: line?.tension ?? 0,
                    }
                },
                plugins: {
                    datalabels: {
                        display: datalabels?.display ?? false,
                        formatter: datalabels?.formatter ?? null,
                    }
                }
            }
        };
    }
}

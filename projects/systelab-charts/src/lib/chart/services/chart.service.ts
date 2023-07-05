import { Injectable } from '@angular/core';
import { ChartConfiguration } from '../interfaces';
import { chartDefaultConfiguration } from '../chart-default-configuration';
import { AxesService } from './axes.service';
import * as ChartJS from 'chart.js';
import { DatasetService } from './dataset.service';
import { AnnotationService } from './annotation.service';
import { LegendService } from './legend.service';

@Injectable({
    providedIn: 'root',
})
export class ChartService {
    private _cx: CanvasRenderingContext2D;

    constructor(private readonly axesService: AxesService, private readonly datasetService: DatasetService,
                private readonly annotationService: AnnotationService, private readonly legendService: LegendService) {
    }

    public mapConfiguration(configuration: ChartConfiguration, cx: CanvasRenderingContext2D): ChartJS.ChartConfiguration {
        this._cx = cx;
        const outputConfiguration = this.mapBasicInformation(configuration);
        const axes = this.axesService.mapConfiguration(configuration.axes);
        const indexAxis: 'x' | 'y' = configuration.axes ? configuration.axes.mainAxis : 'x';
        return {
            ...outputConfiguration,
            options: {
                ...outputConfiguration.options,
                indexAxis,
                scales: axes as any,
            } as any,
        };
    }

    private mapBasicInformation(configuration: ChartConfiguration) {
        // Howto implement the fill flag
        const chartConfiguration = {
            ...chartDefaultConfiguration,
            ...configuration,
            options: {
                ...chartDefaultConfiguration.options,
                ...configuration.options ?? undefined,
                interaction: {
                    ...chartDefaultConfiguration.options.interaction,
                    ...configuration.options?.interaction ?? undefined,
                },
                animations: {
                    ...chartDefaultConfiguration.options.animations,
                    ...configuration.options?.animations ?? undefined,
                }
            }
        };

        const { options:{line, datalabels}} = chartConfiguration;
        const datasets = this.datasetService.mapDatasets(chartConfiguration.type, chartConfiguration.datasets, this._cx);
        const annotations = this.annotationService.mapAnnotations(chartConfiguration.annotations);
        const legend = this.legendService.mapLegend(chartConfiguration.legend);
        return {
            type: chartConfiguration.type,
            data: {
                labels: chartConfiguration.labels,
                datasets,
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
                    },
                    annotation: {
                        annotations,
                    },
                    legend,
                },
            },
        };
    }
}

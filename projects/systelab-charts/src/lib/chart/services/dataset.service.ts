import { Injectable } from '@angular/core';
import { ChartConfiguration, Dataset } from '../interfaces';

@Injectable({
    providedIn: 'root',
})
export class DatasetService {

    private defaultColors: Array<number[]> = [
        [255, 99, 132],
        [54, 162, 235],
        [255, 206, 86],
        [75, 192, 192],
        [220, 220, 220],
        [247, 70, 74],
        [70, 191, 189],
        [253, 180, 92],
        [148, 159, 177],
        [151, 187, 205],
        [231, 233, 237],
        [77, 83, 96]
    ];

    public mapDatasets(chartConfiguration: ChartConfiguration, cx: CanvasRenderingContext2D): any[] {
        let borderColors: any;
        let backgroundColor: any;
        let colorNumber = 0;
        const outputDatasets: any[] = [];

        const {type: chartType, datasets, legend} = chartConfiguration;
        const { enabled: pointStyleEnabled, pointStyle} = legend?.labels ?? { enabled: false, pointStyle: undefined};

        for (let i = 0; i < datasets.length; i++) {
            colorNumber = i;
            if (datasets[i].isGradient) {
                const gradientStroke = cx.createLinearGradient(500, 0, 100, 0);
                gradientStroke.addColorStop(0, this.toRGBA(this.defaultColors[0], 1));
                gradientStroke.addColorStop(1, this.toRGBA(this.defaultColors[1], 1));
                borderColors = gradientStroke;
                backgroundColor = gradientStroke;
            } else if ((['pie','doughnut','polarArea'].includes(chartType)) && !datasets[i].type) {
                const {borderColorList: computedBorderColorList,
                    backgroundColorList: computedBackgroundColorList} = this.getPieDoughnutPolarAreaColors(datasets[i]);
                borderColors = computedBorderColorList;
                backgroundColor = computedBackgroundColorList;
            } else {
                if (!datasets[i].border[0]?.color) {
                    borderColors = this.toRGBA(this.defaultColors[colorNumber], 1);
                }
                if (!datasets[i].backgroundColor) {
                    if (datasets[i].fill) {
                        backgroundColor = this.toRGBA(this.defaultColors[colorNumber], 0.8);
                    } else {
                        backgroundColor = 'transparent';
                    }
                }
            }

            colorNumber++;
            if (colorNumber > (this.defaultColors.length - 1)) {
                colorNumber = 0;
            }

            const dataset = {
                ...datasets[i],
                backgroundColor,
                borderColor: borderColors,
                borderWidth: ('border' in datasets[i] && 'width' in datasets[i].border) ? (datasets[i].border as any).width : 2,
                pointRadius: datasets[i]?.pointRadius ?? 5,
                ...(pointStyleEnabled && pointStyle && {pointStyle}),
            };
            delete dataset.border;

            outputDatasets.push(dataset);
        }
        return outputDatasets;
    }

    // TODO: why to pass background colors similar to the legacy component
    private getPieDoughnutPolarAreaColors(dataset: Dataset) {
        const backgroundColorList: Array<any> = [];
        const borderColorList: Array<any> = [];
        for (let j = 0; j < dataset.data.length; j++) {
            let colorNumber = j;
            if (dataset.border && Array.isArray(dataset.border) &&  dataset.border[j] && 'color' in dataset.border[j]) {
                borderColorList.push(this.toRGBA(dataset.border[j].color as number[], 1));
            } else {
                borderColorList.push(this.toRGBA(this.defaultColors[colorNumber], 1));
            }
            if (dataset.backgroundColor && Array.isArray(dataset.backgroundColor) &&  dataset.backgroundColor[j]) {
                backgroundColorList.push(this.toRGBA(dataset.backgroundColor[j] as number[], 1));
            } else {
                backgroundColorList.push(this.toRGBA(this.defaultColors[colorNumber], 1));
            }

            colorNumber++;
            if (colorNumber > (this.defaultColors.length - 1)) {
                colorNumber = 0;
            }
        }

        return { backgroundColorList, borderColorList };
    }

    private toRGBA(colour: number[], alpha: number = 1): string {
        return `rgba(${colour.concat(alpha).join(',')})`;
    }
}

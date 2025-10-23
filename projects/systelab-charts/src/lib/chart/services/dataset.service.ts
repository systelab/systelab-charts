import { Injectable } from '@angular/core';
import { ChartConfiguration, ChartPointStyleAllowedType, ChartType, Dataset, Legend, ScatterDataset } from '../interfaces';



@Injectable({
    providedIn: 'root',
})
export class DatasetService {

    private readonly defaultColors: Array<number[]> = [
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
        let colorNumber = 0;
        const outputDatasets: any[] = [];

        const { type: chartType, datasets, legend } = chartConfiguration;

        for (const inputDataset of datasets) {
            outputDatasets.push(this.mapDataset(chartType, inputDataset, colorNumber, legend, cx));
            colorNumber++;
            if (colorNumber > (this.defaultColors.length - 1)) {
                colorNumber = 0;
            }
        }

        return outputDatasets;
    }

    private mapDataset(chartType: ChartType, inputDataset: Dataset, colorNumber: number,
                       legend: Legend, cx: CanvasRenderingContext2D): object {
        let borderColor: any;
        let backgroundColor: any;
        if (inputDataset.isGradient) {
            const gradientStroke = cx.createLinearGradient(500, 0, 100, 0);
            gradientStroke.addColorStop(0, this.toRGBA(this.defaultColors[0], 1));
            gradientStroke.addColorStop(1, this.toRGBA(this.defaultColors[1], 1));
            borderColor = gradientStroke;
            backgroundColor = gradientStroke;
        } else if ((['pie','doughnut','polarArea'].includes(chartType)) && !inputDataset.type) {
            const { borderColorList: computedBorderColorList,
                backgroundColorList: computedBackgroundColorList} = this.getPieDoughnutPolarAreaColors(inputDataset);
            borderColor = computedBorderColorList;
            backgroundColor = computedBackgroundColorList;
        } else {
            borderColor = this.toRGBA(this.defaultColors[colorNumber], 1);
            if (!!inputDataset.border) {
                if (inputDataset.border[0]?.color) {
                    borderColor = inputDataset.border[0].color;
                } else if ((inputDataset.border as any).color) {
                    borderColor = (inputDataset.border as any).color;
                }
            }

            if (!inputDataset.backgroundColor) {
                if (inputDataset.fill) {
                    backgroundColor = this.toRGBA(this.defaultColors[colorNumber], 0.8);
                } else {
                    backgroundColor = 'transparent';
                }
            }
        }

        let pointStyle = this.setPointStyle(legend, inputDataset);

        const outputDataset = this.buildOutputDataset(inputDataset, backgroundColor, borderColor, pointStyle);

        this.fillForScatterChart(chartType, inputDataset, outputDataset);

        return outputDataset;
    }

    private buildOutputDataset(inputDataset: Dataset, backgroundColor: any, borderColor: any, pointStyle: ChartPointStyleAllowedType) {
        return {
            type: inputDataset.type,
            label: inputDataset.label,
            data: inputDataset.data,
            yAxisID: inputDataset.yAxisID,
            fill: inputDataset.fill,
            backgroundColor: inputDataset.backgroundColor ?? backgroundColor,
            borderColor: ('border' in inputDataset && 'color' in inputDataset.border) ? (inputDataset.border as any).color : borderColor,
            borderWidth: ('border' in inputDataset && 'width' in inputDataset.border) ? (inputDataset.border as any).width : 2,
            pointRadius: inputDataset?.pointRadius ?? 5,
            pointStyle: pointStyle,
            datalabels: inputDataset.datalabels,
        };
    }

    private setPointStyle(legend: Legend, inputDataset: Dataset):  ChartPointStyleAllowedType 
    {
        const legendPointStyle = legend?.labels?.pointStyle;

        let pointStyle: ChartPointStyleAllowedType = undefined;

        if (inputDataset.pointStyle != null) {
            pointStyle = inputDataset.pointStyle;
        } else if (legendPointStyle != null) {
            pointStyle = legendPointStyle;
        }

        return pointStyle;
    }

    // TODO: why to pass background colors similar to the legacy component
    private getPieDoughnutPolarAreaColors(dataset: Dataset) {
        const backgroundColorList: Array<any> = [];
        const borderColorList: Array<any> = [];
        let colorNumber = 0;
        for (let j = 0; j < dataset.data.length; j++) {
            if (colorNumber > (this.defaultColors.length - 1)) {
                colorNumber = 0;
            }
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
        }

        return { backgroundColorList, borderColorList };
    }

    private toRGBA(colour: number[], alpha: number = 1): string {
        return `rgba(${colour.concat(alpha).join(',')})`;
    }

    private fillForScatterChart(chartType: ChartType, inputDataset: Dataset, outputDataset: object) {
        if (chartType !== ChartType.scatter && inputDataset.type !== 'scatter') {
            return;
        }

        const scatterInputDataset: ScatterDataset = inputDataset as ScatterDataset;
        outputDataset['showLine'] = scatterInputDataset.showLine;
    }
}

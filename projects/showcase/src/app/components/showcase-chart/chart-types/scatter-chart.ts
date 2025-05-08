import { ChartConfiguration, ChartType, InteractionMode, ScatterPoint } from 'systelab-charts';
import { ActiveElement, Chart, ChartEvent } from 'chart.js';

//Custom image to be displayed in all points of the chart - this is just an example
let checkMark: HTMLImageElement = new Image(16, 16);
checkMark.src = 'https://banner2.cleanpng.com/20180703/oxt/aaxcwnq10.webp';

export const scatterChartConfiguration: ChartConfiguration = {
    type: ChartType.scatter,
    datasets: [
        {
            label: 'Only Points',
            data: [{
                x: -10,
                y: 0
              }, {
                x: 0,
                y: 10
              }, {
                x: 10,
                y: 5
              }, {
                x: 0.5,
                y: 5.5
              }
            ],
            border: {
                width: 3,
            },
            showLine: false,
        },
    ],
    legend: {
        labels: {
            enabled: true,
            pointStyle: checkMark
        }
    },
    options: {
        responsive: true,
        interaction: {
            intersect: false,
            mode: InteractionMode.point,
        },
        onClick: (event: ChartEvent, elements: ActiveElement[], chart: Chart): ScatterPoint => {
            // Example to receive a ScatterPoint coordinates when clicking on the point
            const canvasPosition: ScatterPoint = {x: event.x, y: event.y}

            const dataX: string = chart.scales.x.getValueForPixel(canvasPosition.x).toFixed(2);
            const dataY: string = chart.scales.y.getValueForPixel(canvasPosition.y).toFixed(2);

            return {
                x: parseFloat(dataX),
                y: parseFloat(dataY)
            }
        }
    }
};

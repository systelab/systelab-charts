import { ChartConfiguration, ChartType, ClickPoint, InteractionMode } from 'systelab-charts';
import { CustomTooltipService } from '../../../custom-tooltip.service';

//Custom image to be displayed in all points of the chart - this is just an example
let checkMark: HTMLImageElement = new Image(16, 16);
checkMark.src = './assets/check.webp';

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
    tooltip: {
          enabled: false,
    },
    customTooltip: CustomTooltipService.getCustomTooltip,
    options: {
        responsive: true,
        interaction: {
            intersect: false,
            mode: InteractionMode.point,
        },
        onClick: (data: ClickPoint): void => {
            console.log('Clicked on point', data);
        },
        zoom: {
          zoom: {
            wheel: {
              enabled: true,
            },
            pinch: {
              enabled: true
            },
            mode: 'xy',
          },
          pan: {
            enabled: true,
            mode: 'xy',
          }
        },
    }
};



import { ChartConfiguration, ChartType } from 'systelab-charts';

export const scatterChartShowingLineConfiguration: ChartConfiguration = {
    type: ChartType.scatter,
    datasets: [
        {
            label: 'Line',
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
            showLine: true,
            pointRadius: 0
        },
    ],
};

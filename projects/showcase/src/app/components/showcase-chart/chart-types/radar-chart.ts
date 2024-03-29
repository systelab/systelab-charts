import { ChartConfiguration, ChartType } from 'systelab-charts';

export const radarChartConfiguration: ChartConfiguration = {
    type: ChartType.radar,
    labels: {
        data: ['January', 'February', 'March', 'April']
    },
    datasets: [
        {
            label: 'Only Line',
            data: [36, 41, 35, 21],
            border: {
                width: 3,
            },
        }, {
            label: 'Line and Area',
            fill: true,
            data: [37, 40, 21, 15],
            border: {
                width: 3,
            },
        }
    ],
};

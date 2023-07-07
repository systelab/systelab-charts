import { ChartConfiguration, ChartType } from 'systelab-charts';

export const barChartHorizontalConfiguration: ChartConfiguration = {
    type: ChartType.bar,
    labels: ['January', 'February', 'March', 'April'],
    datasets: [
        {
            label: 'Only Line',
            data: [12, 41, 1, 21],
            border: {
                width: 3,
            },
        }, {
            label: 'Line and Area',
            fill: true,
            data: [13, 20, 21, 15],
            border: {
                width: 3,
            },
        },
    ],
    axes: {
        mainAxis: 'y' as ('x' | 'y'),
    },
    options: {
        line: {
            tension: 0.4,
        },
    }
};

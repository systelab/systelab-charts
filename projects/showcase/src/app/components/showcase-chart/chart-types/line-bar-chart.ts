import { ChartConfiguration, ChartType } from 'systelab-charts';

export const lineBarChartConfiguration: ChartConfiguration = {
    type: ChartType.line,
    labels: {
        data: ['January', 'February', 'March', 'April'],
    },
    datasets: [
        {
            label: 'Line',
            isGradient: true,
            data: [13, 20, 21, 15],
            border: [{
                width: 3,
            }]
        }, {
            label: 'Bar',
            fill: true,
            type: ChartType.bar,
            data: [10, 20, 10, 15],
            border: [{
                width: 3,
            }]
        },
    ],
    options: {
        line: {
            tension: 0.4,
        }
    }
};

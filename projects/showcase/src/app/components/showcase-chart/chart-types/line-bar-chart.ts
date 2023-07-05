import { ChartConfiguration, ChartType } from '../../../../../../systelab-charts/src/lib/chart/interfaces';

export const lineBarChartConfiguration: ChartConfiguration = {
    type: ChartType.line,
    labels: ['January', 'February', 'March', 'April'],
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

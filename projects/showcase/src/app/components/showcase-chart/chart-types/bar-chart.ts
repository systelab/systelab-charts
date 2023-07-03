import { ChartType } from '../../../../../../systelab-charts/src/lib/chart/interfaces';

export const barChart = {
    type: ChartType.bar,
    labels: ['January', 'February', 'March', 'April'],
    datasets: [
        {
            label: 'Only Line',
            data: [12, 41, 1, 21],
            border: [{
                width: 3,
            }]
        }, {
            label: 'Line and Area',
            data: [13, 20, 21, 15],
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

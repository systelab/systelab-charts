import { ChartType } from '../../../../../../systelab-charts/src/lib/chart/interfaces';

export const lineChart = {
    type: ChartType.line,
    labels: ['January', 'February', 'March', 'April'],
    datasets: [
        {
            label: 'Only Line',
            data: [13, 20, 21, 15.5],
            border: [{
                width: 3,
            }]
        }, {
            label: 'Only Dots',
            type: ChartType.scatter,
            data: [11, 18, 4, 3],
            border: [{
                width: 4,
            }]
        }, {
            label: 'Line and Area',
            data: [12, 41, 1, 21],
            border: [{
                width: 3,
            }]
        }
    ],
    options: {
        line: {
            tension: 0.4,
        }
    }
};

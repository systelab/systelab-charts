import { ChartConfiguration, ChartType } from 'systelab-charts';

export const bubbleChartConfiguration: ChartConfiguration = {
    type: ChartType.bubble,
    labels: ['January', 'February', 'March', 'April'],
    datasets: [
        {
            label: 'Test 1',
            fill: true,
            data: [{x: 13, y: 13, r: 4}, {x: 1, y: 2, r: 3}, {x: 15, y: 23, r: 4},
                {x: -2, y: -2, r: 4}, {x: -10, y: 13, r: 3}, {x: 23, y: 12, r: 7}, {x: 4, y: 4, r: 8},
                {x: 3, y: 2, r: 9}],
            border: [{
                width: 2,
            }]
        }, {
            label: 'Test 2',
            fill: true,
            data: [{x: 6, y: -2, r: 4}, {x: 2, y: 5, r: 3}, {x: 12, y: 11, r: 4}, {x: 5, y: 10, r: 4},
                {x: 10, y: 46, r: 3}, {x: 16, y: 24, r: 7}, {x: 37, y: 6, r: 8}, {x: 5, y: 3, r: 9}],
            border: [{
                width: 3,
            }]
        }
    ],
};

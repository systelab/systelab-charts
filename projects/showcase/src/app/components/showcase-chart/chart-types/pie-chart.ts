import { ChartType } from '../../../../../../systelab-charts/src/lib/chart/interfaces';

export const pieChart = {
    type: ChartType.pie,
    labels: ['January', 'February', 'March', 'April'],
    datasets: [
        {
            data: [36, 4, 42, 52],
            border: [{
                width: 3,
            }]
        }
    ],
};

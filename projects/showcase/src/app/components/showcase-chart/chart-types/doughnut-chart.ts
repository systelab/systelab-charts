import { ChartConfiguration, ChartType } from 'systelab-charts';

export const doughnutChartConfiguration: ChartConfiguration = {
    type: ChartType.doughnut,
    legend: {
        enabled: false,
    },
    labels: {
        data: ['January', 'February', 'March', 'April'],
    },
    datasets: [
        {
            data: [36, 23, 42, 52],
            border: [{
                width: 3,
            }]
        }
    ],
};

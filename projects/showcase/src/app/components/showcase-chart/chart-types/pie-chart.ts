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
    options: {
        datalabels: {
            display: (context): boolean => {
                const dataArr: Array<number> = (context.chart.data.datasets[0].data as Array<number>);
                const currentPercentage = context.dataset.data[context.dataIndex] * 100 / dataArr.reduce((a, b) => a + b);
                return currentPercentage >= 5;
            },
            formatter: (value, context): string => {
                const dataArr: Array<number> = (context.chart.data.datasets[0].data as Array<number>);
                return (value * 100 / dataArr.reduce((a, b) => a + b)).toFixed(0) + '%';
            }
        }
    }
};

import { ChartConfiguration, ChartType } from 'systelab-charts';

export const pieChartConfiguration: ChartConfiguration = {
    type: ChartType.pie,
    labels: ['January', 'February', 'March', 'April'],
    datasets: [
        {
            data: [36, 4, 42, 52],
            backgroundColor: [[119, 136, 153]],
            fill: true,
            border: [{
                width: 0,
            }]
        }
    ],
    options: {
        datalabels: {
            display: (context): boolean => {
                const dataArr: Array<number> = (context.chart.data.datasets[0].data as Array<number>);
                const currentPercentage = Number(context.dataset.data[context.dataIndex]) * 100 / dataArr.reduce((a, b) => a + b);
                return currentPercentage >= 5;
            },
            formatter: (value, context): string => {
                const dataArr: Array<number> = (context.chart.data.datasets[0].data as Array<number>);
                return (value * 100 / dataArr.reduce((a, b) => a + b)).toFixed(0) + '%';
            }
        }
    }
};

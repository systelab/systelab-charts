import { ChartConfiguration, ChartType } from 'systelab-charts';

export const pieChartConfiguration: ChartConfiguration = {
    type: ChartType.pie,
    labels: {
        data: ['2022 January', '2022 February', '2022 March', '2022 April','2022 March', '2022 June', '2022 July', '2022 August','2022 September', '2022 Octuber', '2022 November', '2022 Dicember', '2023 January', '2023 February'],
    },
    datasets: [
        {
            data: [36, 4, 42, 52,5,5,5,5,5,5,5,5,5],
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

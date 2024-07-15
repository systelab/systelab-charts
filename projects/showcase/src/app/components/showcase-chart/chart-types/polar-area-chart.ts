import { ChartConfiguration, ChartType } from 'systelab-charts';

export const polarAreaChartConfiguration: ChartConfiguration = {
    type: ChartType.polarArea,
    datasets: [
        {
            label: '',
            data: [21, 23, 42, 52],
            border: [{
                width: 3,
            }]
        },
    ],
};

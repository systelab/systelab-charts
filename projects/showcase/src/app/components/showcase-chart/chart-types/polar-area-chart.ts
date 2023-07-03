import { ChartType } from '../../../../../../systelab-charts/src/lib/chart/interfaces';

export const polarAreaChart = {
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

import { ChartConfiguration, ChartType, InteractionMode } from './interfaces';

export const chartDefaultConfiguration: ChartConfiguration = {
    type: ChartType.line,
    labels: [],
    datasets: [],
    options: {
        interaction: {
            intersect: false,
            mode: InteractionMode.index,
        },
        responsive: true,
        maintainAspectRatio: true,
        animations: {
            duration: 2000,
        }
    }
};

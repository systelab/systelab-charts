import { ChartConfiguration, ChartType, InteractionMode } from './interfaces';

// export const chartDefaultValues: ChartJS.ChartConfiguration = {
//     type: ChartType.line,
//     data: {
//         labels: ['One', 'Two', 'Three'],
//         datasets: [
//             {
//                 data: [1, 2, 3]
//             }, {
//                 data: [8, 1, 2]
//             }
//         ]
//     }
// };

export const chartDefaultValues: ChartConfiguration = {
    type: ChartType.line,
    labels: [],
    datasets: [],
    options: {
        interactions: {
            intersect: true,
            mode: InteractionMode.index,
        },
        responsive: true,
        maintainAspectRatio: true,
        animations: {
            duration: 2000,
        }
    }
};

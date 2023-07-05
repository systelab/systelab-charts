import {
    ChartConfiguration,
    ChartType,
    LegendPointStyle,
    LegendPosition
} from '../../../../../../systelab-charts/src/lib/chart/interfaces';

export const lineChartWithLineLegendConfiguration: ChartConfiguration = {
    type: ChartType.line,
    labels: ['January', 'February', 'March', 'April'],
    datasets: [
        {
            label: 'Line 1',
            fill: true,
            data: [13, 20, 21, 15.5],
            border: {
                width: 1,
            },
            pointRadius: 0,
        }, {
            label: 'Line 2',
            fill: true,
            data: [11, 18, 4, 3],
            border: {
                width: 1,
            },
            pointRadius: 0,
        }, {
            label: 'Line 3',
            fill: true,
            data: [12, 41, 1, 21],
            border: {
                width: 1,
            },
            pointRadius: 0,
        }
    ],
    legend: {
        enabled: true,
        title: {
            enabled: true,
            text: 'Legend title',
        },
        position: LegendPosition.top,
        disabledClickEvent: true,
        labels: {
            enabled: true,
            pointStyle: LegendPointStyle.line,
        }
    },
    options: {
        line: {
            tension: 0.4,
        }
    }
};

import {
    ChartConfiguration,
    ChartType,
    LegendPointStyle,
    LegendPosition
} from '../../../../../../systelab-charts/src/lib/chart/interfaces';

export const lineChartWithLineLegendConfiguration: ChartConfiguration = {
    type: ChartType.line,
    labels: {
        data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14'],
        skipItems: 4,
    },
    datasets: [
        {
            label: 'Line 1',
            data: [13, 20, 21, 15.5, 34, 56, 12, 33, 98, 54, 67, 78, 76, 43],
            border: {
                width: 1,
            },
            pointRadius: 0,
        }, {
            label: 'Line 2',
            data: [11, 18, 4, 3, 13, 20, 21, 15.5, 34, 56, 12, 33, 98, 33],
            border: {
                width: 1,
            },
            pointRadius: 0,
        }, {
            label: 'Line 3',
            data: [12, 41, 1, 21, 20, 21, 15.5, 34, 56, 12, 33, 89, 42, 55],
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
    tooltip: {
        enabled: true,
        title: {
            prefix: 'Time: ',
        }
    },
    options: {
        line: {
            tension: 0.4,
        }
    }
};

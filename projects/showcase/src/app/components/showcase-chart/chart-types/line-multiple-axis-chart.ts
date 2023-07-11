import {
    AnnotationType,
    ChartConfiguration,
    ChartType
} from 'systelab-charts';

export const lineMultipleAxisChartConfiguration: ChartConfiguration = {
    type: ChartType.line,
    labels: {
        data: ['1', '2', '3', '4'],
    },
    datasets: [
        {
            label: 'Only Line',
            data: [13, 20, 21, 15.5],
            yAxisID: 'yAxis0',
            border: [{
                width: 3,
            }]
        }, {
            label: 'Only Dots',
            fill: true,
            type: ChartType.scatter,
            data: [11, 18, 4, 3],
            yAxisID: 'yAxis0',
            border: [{
                width: 4,
            }]
        }, {
            label: 'Line and Area',
            data: [2, 4, 1, 2],
            yAxisID: 'yAxis1',
            border: [{
                width: 3,
            }]
        }
    ],
    axes: {
        dataAxes:
            {
                yAxis0: {
                    min: 5,
                    max: 105,
                    ticks: {
                        stepSize: 5,
                    }
                },
                yAxis1: {
                    position: 'right',
                    min: 0,
                    max: 10,
                    ticks: {
                        stepSize: 2,
                    }
                }
            }
    },
    annotations: [
        {
            type: AnnotationType.line,
            label: {
                display: true,
                text: 'Label',
            },
            border: {
                color: 'rgb(229, 60, 41)',
                width: 2,
            },
            value: '3',
        }
    ],
    options: {
        line: {
            tension: 0.4,
        }
    }
};

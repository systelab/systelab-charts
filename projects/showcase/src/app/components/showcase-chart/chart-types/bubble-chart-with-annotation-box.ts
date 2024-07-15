import { AnnotationType, ChartConfiguration, ChartType } from 'systelab-charts';

export const bubbleChartWithAnnotationBoxConfiguration: ChartConfiguration = {
    type: ChartType.bubble,
    labels: {
        data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14'],
    },
    legend: {
        enabled: false,
    },
    datasets: [
        {
            label: 'Test 1',
            fill: true,
            data: [{x: 13, y: 13, r: 2}, {x: 1, y: 2, r: 2}, {x: 15, y: 23, r: 2},
                {x: -2, y: -2, r: 2}, {x: -10, y: 13, r: 2}, {x: 23, y: 12, r: 2}, {x: 4, y: 4, r: 2}, {x: 5, y: 6, r: 2},
                {x: 2, y: 3, r: 2}, {x: 1, y: 2, r: 2}, {x: 3, y: 2, r: 2}],
            border: [{
                width: 2,
            }]
        },
    ],
    annotations: [
        {
            type: AnnotationType.box,
            limits: {
                x: {
                    min: 2,
                    max: 10
                },
                y: {
                    min: 2,
                    max: 10,
                }
            },
            border: {
                color: 'rgb(204, 204, 204)',
            },
        }, {
            type: AnnotationType.box,
            limits: {
                x: {
                    min: 0,
                    max: 12
                },
                y: {
                    min: 0,
                    max: 12,
                }
            },
            border: {
                color: 'rgb(90, 193, 75)',
            },
        }
    ]
};

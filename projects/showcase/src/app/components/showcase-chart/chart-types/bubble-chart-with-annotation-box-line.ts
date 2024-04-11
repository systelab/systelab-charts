import { AnnotationDrawTime } from '../../../../../../systelab-charts/src/lib/chart/interfaces/annotation';
import {
    AnnotationLabelLabelPosition,
    AnnotationType,
    ChartConfiguration,
    ChartType,
    LineAnnotationOrientation
} from 'systelab-charts';

export const bubbleChartWithAnnotationBoxLineConfiguration: ChartConfiguration = {
    type: ChartType.bubble,
    labels: {
        data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14'],
    },
    legend: {
        enabled: true,
    },
    datasets: [
        {
            label: 'Test 1',
            fill: true,
            backgroundColor: 'rgb(52, 106, 182)',
            data: [{x: 13, y: 13, r: 2}, {x: 1, y: 2, r: 2}, {x: 15, y: 23, r: 2},
                {x: -2, y: -2, r: 2}, {x: -10, y: 13, r: 2}, {x: 23, y: 12, r: 2}, {x: 4, y: 4, r: 2}, {x: 5, y: 6, r: 2},
                {x: 2, y: 3, r: 2}, {x: 1, y: 2, r: 2}, {x: 3, y: 2, r: 2}],
            border: {
                width: 2,
                color: 'rgb(52, 106, 182)'
            }
        },
    ],
    annotations: [
        {
            type: AnnotationType.line,
            orientation: LineAnnotationOrientation.horizontal,
            border: {
                color: 'rgb(40, 122, 229)',
                width: 1,
                dash: true,
            },
            value: 4.5,
        }, {
            type: AnnotationType.line,
            orientation: LineAnnotationOrientation.horizontal,
            border: {
                color: 'rgb(40, 122, 229)',
                width: 1,
                dash: true,
            },
            value: 9,
        },
        {
            type: AnnotationType.line,
            orientation: LineAnnotationOrientation.horizontal,
            backgroundColor: 'rgb(40, 122, 229)',
            label: {
                display: true,
                text: 'Label',
                position: AnnotationLabelLabelPosition.start,
                backgroundColor: 'rgb(40, 122, 229)',
                border: {
                    color: 'rgb(40, 122, 229)',
                },
            },
            border: {
                color: 'rgb(40, 122, 229)',
                width: 1,
                dash: true,
            },
            value: -1,
        },
        {
            type: AnnotationType.line,
            border: {
                color: 'rgb(66, 244, 131)',
                width: 1,
            },
            value: 6,
        }, {
            type: AnnotationType.line,
            orientation: LineAnnotationOrientation.horizontal,
            border: {
                color: 'rgb(0, 0, 0)',
                width: 1,
            },
            value: -5,
            endValue: 20,
        }, {
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
            backgroundColor: "rgb(204, 204, 204)",
            drawTime: AnnotationDrawTime.beforeDatasetsDraw,
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

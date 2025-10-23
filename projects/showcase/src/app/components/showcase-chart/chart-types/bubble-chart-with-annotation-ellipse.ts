import {
    AnnotationDrawTime,
    AnnotationType,
    ChartConfiguration,
    ChartPointStyle,
    ChartType,
} from 'systelab-charts';

export const bubbleChartWithAnnotationEllipseConfiguration: ChartConfiguration = {
    type: ChartType.bubble,
    legend: {
        enabled: false,
    },
    datasets: [
        {
            fill: true,
            label: 'Data Values',
            backgroundColor: 'black',
            pointStyle: ChartPointStyle.Star,
            data: [{x: 8, y: 3, r: 5}, {x: 6, y: 2, r: 5}, {x: 7.5, y: 2.5, r: 5},
                {x: 4.5, y: 2, r: 5}, {x: 9.5, y: 2, r: 5}, {x: 7, y: 3, r: 5}
            ],
            border: {
                width: 1,
                color: 'black'
            }
        }
    ],
    annotations: [
        {
            type: AnnotationType.ellipse,
            xMax: 10,
            xMin: 4,
            yMax: 3.5,
            yMin: 1.5,
            rotation: -14,
            drawTime: AnnotationDrawTime.beforeDatasetsDraw,
            backgroundColor: 'transparent',
            border: {
                color: 'orange',
            }
        }, 
        {
            type: AnnotationType.ellipse,
            xMax: 9,
            xMin: 5,
            yMax: 3,
            yMin: 2,
            rotation: -14,
            backgroundColor: 'rgba(188, 255, 190, 0.5)',
            drawTime: AnnotationDrawTime.beforeDatasetsDraw,
            border: {
                color: 'black',
            }
        }
    ],
    axes: {
        dataAxes: {
            y: {
                min: 0,
                max: 5,
            },
            x: {
                min: 0,
                max: 12,
            }
        }
    },
    options: {
        line: {
            tension: 0,
        }
    }
};

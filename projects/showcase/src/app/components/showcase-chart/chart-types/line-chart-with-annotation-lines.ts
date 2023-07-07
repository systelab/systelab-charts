import {
    AnnotationLabelLabelPosition,
    AnnotationType,
    ChartConfiguration,
    ChartType,
    LineAnnotationOrientation
} from '../../../../../../systelab-charts/src/lib/chart/interfaces';

export const lineChartWithAnnotationLinesConfiguration: ChartConfiguration = {
    type: ChartType.line,
    labels: {
        data:  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14'],
    },
    legend: {
        enabled: false,
    },
    datasets: [
        {
            label: 'Data Values',
            data: [2.4, 2, 1.8, 2.7, 2.5, 2.4, 2.3, 2.8, 2.3, 2.4, 2.7, 2.1, 1.9, 1.8],
            border: {
                width: 3,
            }
        }
    ],
    annotations: [
        {
            type: AnnotationType.line,
            value: 2.5,
            orientation: LineAnnotationOrientation.horizontal,
            border: {
                color: 'rgb(0,0,0)',
            }
        }, {
            type: AnnotationType.line,
            value: 1.5,
            orientation: LineAnnotationOrientation.horizontal,
            border: {
                color: 'rgb(229, 60, 41)',
                dash: true,
            },
            label: {
                display: true,
                text: '-1 SD',
                position: AnnotationLabelLabelPosition.start,
                backgroundColor: 'rgb(229, 60, 41)',
            }
        }, {
            type: AnnotationType.line,
            value: 3.5,
            orientation: LineAnnotationOrientation.horizontal,
            border: {
                color: 'rgb(229, 60, 41)',
                dash: true,
            },
            label: {
                display: true,
                text: '+1 SD',
                position: AnnotationLabelLabelPosition.start,
                backgroundColor: 'rgb(229, 60, 41)',
            }
        }, {
            type: AnnotationType.line,
            value: 4.5,
            orientation: LineAnnotationOrientation.horizontal,
            border: {
                color: 'rgb(40, 122, 229)',
                dash: true,
            },
            label: {
                display: true,
                text: '+2 SD',
                position: AnnotationLabelLabelPosition.start,
                backgroundColor: 'rgb(40, 122, 229)',
                border: {
                    color: 'rgb(40, 122, 229)',
                }
            }
        }, {
            type: AnnotationType.line,
            value: 0.5,
            orientation: LineAnnotationOrientation.horizontal,
            border: {
                color: 'rgb(40, 122, 229)',
                dash: true,
            },
            label: {
                display: true,
                text: '-2 SD',
                position: AnnotationLabelLabelPosition.start,
                backgroundColor: 'rgb(40, 122, 229)',
                border: {
                    color: 'rgb(40, 122, 229)',
                }
            }
        }
    ],
    axes: {
      dataAxes: {
          y: {
              min: 0,
              max: 5,
          }
      }
    },
    options: {
        line: {
            tension: 0,
        }
    }
};

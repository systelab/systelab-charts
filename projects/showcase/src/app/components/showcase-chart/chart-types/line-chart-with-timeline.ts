import { ChartConfiguration, ChartType } from '../../../../../../systelab-charts/src/lib/chart/interfaces';


const labelsTimeLine = [
    new Date(2021, 5, 15),
    new Date(2022, 1, 12),
    new Date(2022, 2, 5),
    new Date(2022, 1, 1),
    new Date(2022, 1, 20),
    new Date(2022, 2, 14),
    new Date(2022, 3, 7),
];

export const lineChartWithTimeline: ChartConfiguration = {
    type: ChartType.line,
    labels: labelsTimeLine,
    datasets: [
        {
            label: 'Label',
            data: [
                {
                    x: labelsTimeLine[0],
                    y: 3,
                }, {
                    x: labelsTimeLine[1],
                    y: 1,
                }, {
                    x: labelsTimeLine[2],
                    y: 10
                }
            ],
            border: [{
                width: 3,
            }]
        }, {
            label: 'Label 2',
            data: [
                {
                    x: labelsTimeLine[3],
                    y: 2,
                }, {
                    x: labelsTimeLine[4],
                    y: 4,
                }, {
                    x: labelsTimeLine[5],
                    y: 8,
                }, {
                    x: labelsTimeLine[6],
                    y: 10
                }
            ],
            border: [{
                width: 4,
            }]
        },
    ],
    axes: {
        dataAxes: {
            x: {
                type: 'time',
                distribution: 'linear',
                time: {
                  unit: 'month',
                  minUnit: 'minute',
                }
            }
      }
    },
    options: {
        line: {
            tension: 0,
        }
    }
};

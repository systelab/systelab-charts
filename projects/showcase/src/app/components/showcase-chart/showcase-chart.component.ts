import { Component } from '@angular/core';
import { ChartConfiguration } from '../../../../../systelab-charts/src/lib/chart/interfaces';
import { lineChart } from './chart-types/line-chart';
import { lineMultipleAxisChart } from './chart-types/line-multiple-axis-chart';
import { lineChartWithTimeline } from './chart-types/line-chart-with-timeline';
import { barChart } from './chart-types/bar-chart';
import { barChartHorizontal } from './chart-types/bar-chart-horizontal';
import { radarChart } from './chart-types/radar-chart';
import { pieChart } from './chart-types/pie-chart';
import { doughnutChart } from './chart-types/doughnut-chart';
import { bubbleChart } from './chart-types/bubble-chart';
import { polarAreaChart } from './chart-types/polar-area-chart';
import { lineBarChart } from './chart-types/line-bar-chart';

@Component({
  selector: 'app-showcase-chart',
  templateUrl: './showcase-chart.component.html',
})
export class ShowcaseChartComponent {

  // Charts configurations
  public lineChartData: ChartConfiguration = lineChart;
  public lineMultipleAxisChartData: ChartConfiguration = lineMultipleAxisChart;
  public lineChartWithTimelineData: ChartConfiguration = lineChartWithTimeline;
  public barChartData: ChartConfiguration = barChart;
  public barChartHorizontalData: ChartConfiguration = barChartHorizontal;
  public radarChartData: ChartConfiguration = radarChart;
  public pieChartData: ChartConfiguration = pieChart;
  public doughnutChartData: ChartConfiguration = doughnutChart;
  public bubbleChartData: ChartConfiguration = bubbleChart;
  public polarAreaChartData: ChartConfiguration = polarAreaChart;
  public lineBarChartData: ChartConfiguration = lineBarChart;
  constructor() {}
}

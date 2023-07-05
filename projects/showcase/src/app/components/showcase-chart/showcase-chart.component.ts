import { Component } from '@angular/core';
import { ChartConfiguration } from '../../../../../systelab-charts/src/lib/chart/interfaces';
import {
  barChartConfiguration,
  barChartHorizontalConfiguration,
  bubbleChartConfiguration,
  doughnutChartConfiguration,
  lineBarChartConfiguration,
  lineChartConfiguration,
  lineChartWithTimelineConfiguration,
  lineMultipleAxisChartConfiguration,
  pieChartConfiguration,
  polarAreaChartConfiguration,
  radarChartConfiguration
} from './chart-types';
import { lineChartWithAnnotationLinesConfiguration } from './chart-types/line-chart-with-annotation-lines';

@Component({
  selector: 'app-showcase-chart',
  templateUrl: './showcase-chart.component.html',
})
export class ShowcaseChartComponent {

  // Charts configurations
  public lineChartConfiguration: ChartConfiguration = lineChartConfiguration;
  public lineMultipleAxisChartConfiguration: ChartConfiguration = lineMultipleAxisChartConfiguration;
  public lineChartWithTimelineConfiguration: ChartConfiguration = lineChartWithTimelineConfiguration;
  public barChartConfiguration: ChartConfiguration = barChartConfiguration;
  public barChartHorizontalConfiguration: ChartConfiguration = barChartHorizontalConfiguration;
  public radarChartConfiguration: ChartConfiguration = radarChartConfiguration;
  public pieChartConfiguration: ChartConfiguration = pieChartConfiguration;
  public doughnutChartConfiguration: ChartConfiguration = doughnutChartConfiguration;
  public bubbleChartConfiguration: ChartConfiguration = bubbleChartConfiguration;
  public polarAreaChartConfiguration: ChartConfiguration = polarAreaChartConfiguration;
  public lineBarChartConfiguration: ChartConfiguration = lineBarChartConfiguration;
  public lineChartWithAnnotationLinesConfiguration: ChartConfiguration = lineChartWithAnnotationLinesConfiguration;
}

import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ChartConfiguration } from './interfaces/chart-configuration';
import * as ChartJS from 'chart.js';
import { ChartService } from './services/chart.service';


@Component({
  selector: 'systelab-chart',
  templateUrl: './chart.component.html',
})
export class ChartComponent implements AfterViewInit {
  @ViewChild('chartCanvas', {static: true}) chartCanvas: ElementRef;
  @ViewChild('topLegend', {static: false}) topLegend: ElementRef;
  @ViewChild('bottomLegend', {static: false}) bottomLegend: ElementRef;

  @Input() config: ChartConfiguration;

  public chart: ChartJS.Chart;

  constructor(private readonly chartService: ChartService) {}

  public ngAfterViewInit(): void {
    const chartConfiguration = this.chartService.mapConfiguration(this.config);

    this.drawChart(chartConfiguration);
  }

  private drawChart(chartConfiguration) {
    let cx: CanvasRenderingContext2D;

    if (this.chartCanvas.nativeElement) {
      cx = this.chartCanvas.nativeElement.getContext('2d');
    }
      this.chart = new ChartJS.Chart(cx, chartConfiguration);
  }
}

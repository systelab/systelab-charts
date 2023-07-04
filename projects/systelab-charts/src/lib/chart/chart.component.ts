import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ChartConfiguration } from './interfaces';
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
    if (this.chartCanvas.nativeElement) {
      const cx: CanvasRenderingContext2D = this.chartCanvas.nativeElement.getContext('2d');
      const chartConfiguration = this.chartService.mapConfiguration(this.config, cx);
      this.drawChart(chartConfiguration, cx);
    }
  }

  private drawChart(chartConfiguration, cx) {
    this.chart = new ChartJS.Chart(cx, chartConfiguration);
  }
}

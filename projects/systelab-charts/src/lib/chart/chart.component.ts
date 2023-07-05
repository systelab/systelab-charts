import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, InteractionMode } from './interfaces';
import * as ChartJS from 'chart.js';
import { ChartService } from './services/chart.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import annotationPlugin from 'chartjs-plugin-annotation';

ChartJS.Chart.register(...ChartJS.registerables, ChartDataLabels, annotationPlugin);

@Component({
  selector: 'systelab-chart',
  templateUrl: './chart.component.html',
})
export class ChartComponent implements OnInit, AfterViewInit {
  @ViewChild('chartCanvas', {static: true}) chartCanvas: ElementRef;
  @ViewChild('topLegend', {static: false}) topLegend: ElementRef;
  @ViewChild('bottomLegend', {static: false}) bottomLegend: ElementRef;

  @Input() config: ChartConfiguration;

  public chart: ChartJS.Chart;

  constructor(private readonly chartService: ChartService) {}

  ngOnInit() {
    ChartJS.Chart.defaults.interaction.intersect = this.config.options?.interaction?.intersect ?? false;
    ChartJS.Chart.defaults.interaction.mode = this.config.options?.interaction?.mode ?? InteractionMode.index;
  }

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

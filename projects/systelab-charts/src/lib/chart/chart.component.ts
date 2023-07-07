import { AfterContentInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, InteractionMode } from './interfaces';
import * as ChartJS from 'chart.js';
import { ChartService } from './services/chart.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import annotationPlugin from 'chartjs-plugin-annotation';

const afterRenderingDetectorPlugin = {
  id: 'afterRenderingDetector',
  afterInit: (chart, args, options) => options.afterInitCallback(),
  afterUpdate: (chart, args, options) => options.afterUpdateCallback(),
  defaults: {
    afterInitCallback: () => {},
    afterUpdateCallback: () => {},
  }
};

ChartJS.Chart.register(...ChartJS.registerables, ChartDataLabels, annotationPlugin, afterRenderingDetectorPlugin);


@Component({
  selector: 'systelab-chart',
  templateUrl: './chart.component.html',
})
export class ChartComponent implements OnInit, AfterContentInit {
  @Input() config: ChartConfiguration;
  @ViewChild('chartCanvas', {static: true}) chartCanvas: ElementRef;

  public chart: ChartJS.Chart;
  public drawing = true;

  constructor(private readonly chartService: ChartService) {}

  ngOnInit() {
    ChartJS.Chart.defaults.interaction.intersect = this.config.options?.interaction?.intersect ?? false;
    ChartJS.Chart.defaults.interaction.mode = this.config.options?.interaction?.mode ?? InteractionMode.index;
  }

  public ngAfterContentInit(): void {
    this.drawChart();
  }

  private drawChart(): void {
    if (!this.chartCanvas.nativeElement) {
      return;
    }

    this.drawing = true;

    const cx: CanvasRenderingContext2D = this.chartCanvas.nativeElement.getContext('2d');
    let chartConfiguration: ChartJS.ChartConfiguration = this.chartService.mapConfiguration(this.config, cx);
    const animationEnabled: boolean = (chartConfiguration.options.animation as any).duration > 0;

    chartConfiguration = {
      ...chartConfiguration,
      options: {
        ...chartConfiguration.options,
        animation: {
          ...chartConfiguration.options.animation,
          onComplete: () => {
            this.drawing = false;
            console.log('animation callback');
          },
        },
        plugins: {
          ...chartConfiguration.options.plugins,
          afterRenderingDetector: {
            afterInitCallback: () => {
              if (!animationEnabled) {
                this.drawing = false;
              }
            },
            afterUpdateCallback: () => {
              if (!animationEnabled) {
                this.drawing = false;
              }
            },
          },
        } as any,
      }
    };
    console.log(chartConfiguration);

    this.chart = new ChartJS.Chart(cx, chartConfiguration);
  }
}

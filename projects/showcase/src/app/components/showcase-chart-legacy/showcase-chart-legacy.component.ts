import { Component, ViewChild } from '@angular/core';

import {
	Annotation,
	ChartBoxAnnotation,
	ChartItem,
	ChartLabelAnnotation,
	ChartLabelColor,
	ChartLabelFont,
	ChartLabelPadding,
	ChartLabelPosition,
	ChartLabelSettings,
	ChartLegacyComponent,
	ChartLine,
	ChartLineAnnotation,
	ChartMultipleYAxisScales,
	ChartTooltipItem,
	ChartTooltipSettings
} from 'systelab-charts';

@Component({
	selector:    'app-showcase-chart-legacy',
	templateUrl: './showcase-chart-legacy.component.html'
})
export class ShowcaseChartLegacyComponent {

	@ViewChild('lineChart') lineChart: ChartLegacyComponent;
	@ViewChild('timelineChart') timelineChart: ChartLegacyComponent;
	@ViewChild('lineChartMultipleAxis') lineChartMultipleAxis: ChartLegacyComponent;
	@ViewChild('lineChartLegend') lineChartLegend: ChartLegacyComponent;
	@ViewChild('resizableCChart') resizableChart: ChartLegacyComponent;

	public type: string;
	public itemSelected: any;
	public legend: boolean;
	public dataLine: Array<ChartItem> = [];
	public dataTimeLine: Array<ChartItem> = [];
	public dataLineMultipleAxis: Array<ChartItem> = [];
	public dataBar: Array<ChartItem> = [];
	public dataRadar: Array<ChartItem> = [];
	public dataPie: Array<ChartItem> = [];
	public dataDoughnut: Array<ChartItem> = [];
	public dataBubble: Array<ChartItem> = [];
	public dataPolarArea: Array<ChartItem> = [];
	public dataLineBar: Array<ChartItem> = [];
	public dataLineBubble: Array<ChartItem> = [];
	public dataLineAnnotation: Array<ChartItem> = [];
	public dataBubbleAnnotations: Array<ChartItem> = [];
	public chartLineAnnotations: Array<ChartLineAnnotation> = [];
	public chartLineMultipleAxisAnnotations: Array<ChartLineAnnotation> = [];
	public chartMultipleAnnotations: Array<Annotation> = [];
	public chartBubbleAnnotations: Array<Annotation> = [];
	public labels: Array<string> = [];
	public labelsTimeLine: Array<Date> = [];
	public labelsMultipleAxis: Array<string> = [];
	public labelLineAnnotations: Array<number> = [];
	public isBackgroundGrid = false;
	public yMinValue = 0;
	public yMaxValue = 5;
	public legendOff = false;
	public xLabelAxis = 'Title X';
	public yLabelAxis = 'Title Y';
	public tooltipSettings = new ChartTooltipSettings();
	public isStacked = true;
	public dataLineCustomLegend: Array<ChartItem> = [];
	public multipleYAxisScales: Array<ChartMultipleYAxisScales> = [];
	public pieChartLabelSettings: ChartLabelSettings;
	public defaultResizeWidth = 1280;
	public defaultResizeHeight = 900;
	public resizedImage: string;
	public chartLine: ChartLine;

	constructor() {
		this.type = 'line';
		this.legend = true;
		this.labels = ['January', 'February', 'March', 'April'];
		this.labelsMultipleAxis = ['1', '2', '3', '4'];

		this.tooltipSettings.backgroundColor = '#ffffff';
		this.tooltipSettings.borderColor = '#0066ff';
		this.tooltipSettings.borderWidth = 3;
		this.tooltipSettings.bodyFontColor = '#6c757d';
		this.tooltipSettings.bodyFontSize = 15;
		this.tooltipSettings.titleFontColor = '#fd7e14';
		this.tooltipSettings.titleFontSize = 20;

		this.generateMultipleAxisExample();

		this.dataLine.push(new ChartItem('Only Line', [13, 20, 21, 15.5], '', '', false, true, false, 3, '',
			new ChartTooltipItem('title', 'label', 'afterlabel', true)));

		this.dataLine.push(new ChartItem('Only Dots', [11, 18, 4, 3], '', '', false, false, false, 4));
		this.dataLine.push(new ChartItem('Line and Area', [12, 41, 1, 21], '', '', true, true, false, 3));

		this.dataTimeLine.push(new ChartItem('Label', [
			{
				x: (new Date(2021, 5, 15)),
				y: 3
			},
			{
				x: (new Date(2022, 1, 12)),
				y: 1
			}, {
				x: (new Date(2022, 2, 5)),
				y: 10
			},
		], '', '', false, true, false, 3, ''));
		this.dataTimeLine.push(new ChartItem('Label 2', [
			{
				x: (new Date(2022, 1, 1)),
				y: 2
			},
			{
				x: (new Date(2022, 1, 20)),
				y: 4
			}, {
				x: (new Date(2022, 2, 14)),
				y: 8
			}, {
				x: (new Date(2022, 3, 7)),
				y: 10
			},

		], '', '', false, true, false, 3, ''));

		this.labelsTimeLine = [
			new Date(2021, 5, 15),
			new Date(2022, 1, 12),
			new Date(2022, 2, 5),
			new Date(2022, 1, 1),
			new Date(2022, 1, 20),
			new Date(2022, 2, 14),
			new Date(2022, 3, 7),
		];


		this.dataBar.push(new ChartItem('Only Line', [12, 41, 1, 21], '', '', false, false, false, 3));
		this.dataBar.push(new ChartItem('Line and Area', [13, 20, 21, 15], '', '', true, true, false, 3));

		this.dataRadar.push(new ChartItem('Only Line', [36, 41, 35, 21], '', '', false, true, false, 3));
		this.dataRadar.push(new ChartItem('Line and Area', [37, 40, 21, 15], '', '', true, true, false, 3));

		this.dataDoughnut.push(new ChartItem('', [36, 23, 42, 52], '', '', true, true, false, 3));

		this.pieChartLabelSettings = new ChartLabelSettings();
		this.pieChartLabelSettings.position = new ChartLabelPosition();
		this.pieChartLabelSettings.position.clip = false; // to avoid showing part of the label, set clip = true

		this.pieChartLabelSettings.position.display = (context: any): boolean => {

			const dataArr: Array<number> = (context.chart.data.datasets[0].data as Array<number>);

			const currentPercentage = context.dataset.data[context.dataIndex] * 100 / dataArr.reduce((a, b) => a + b);

			return currentPercentage >= 5;
		};
		this.pieChartLabelSettings.labelColors = new ChartLabelColor(undefined, 'black', undefined, 5, 1, 0.8);
		const fontFamily = 'Courier, Arial Unicode MS, Arial, sans-serif';
		this.pieChartLabelSettings.chartLabelFont = new ChartLabelFont(undefined, fontFamily, 16, undefined, 'bold', 0.8);
		this.pieChartLabelSettings.chartLabelPadding = new ChartLabelPadding(undefined, 1, 1, 1, 1);

		this.pieChartLabelSettings.formatter = (value: any, context: any): string => {
			const dataArr: Array<number> = (context.chart.data.datasets[0].data as Array<number>);
			return (value * 100 / dataArr.reduce((a, b) => a + b)).toFixed(0) + '%';
		};

		const pieChartItem = new ChartItem('', [36, 4, 42, 52], '', '#778899', true, true, false, 3);
		pieChartItem.labelBorderColors = this.generateColorsForSections(pieChartItem.data.length);
		pieChartItem.labelBackgroundColors = this.generateColorsForSections(pieChartItem.data.length);
		this.dataPie.push(pieChartItem);

		const polarAreaChartItem = new ChartItem('', [21, 23, 42, 52], '', '', true, true, false, 3);
		polarAreaChartItem.labelBorderColors = this.generateColorsForSections(polarAreaChartItem.data.length);
		polarAreaChartItem.labelBackgroundColors = this.generateColorsForSections(polarAreaChartItem.data.length);
		this.dataPolarArea.push(polarAreaChartItem);

		this.dataBubble.push(new ChartItem('Test 1', [{x: 13, y: 13, r: 4, t: 'Tooltip'}, {x: 1, y: 2, r: 3}, {x: 15, y: 23, r: 4},
			{x: -2, y: -2, r: 4}, {x: -10, y: 13, r: 3}, {x: 23, y: 12, r: 7}, {x: 4, y: 4, r: 8},
			{x: 3, y: 2, r: 9}], '', '', true, false, false, 2));
		this.dataBubble.push(new ChartItem('Test 2', [{x: 6, y: -2, r: 4}, {x: 2, y: 5, r: 3}, {x: 12, y: 11, r: 4}, {x: 5, y: 10, r: 4},
			{x: 10, y: 46, r: 3}, {x: 16, y: 24, r: 7}, {x: 37, y: 6, r: 8}, {x: 5, y: 3, r: 9}], '', '', true, false, false, 2));

		this.dataLineBar.push(new ChartItem('Line', [13, 20, 21, 15], '', '', false, true, true, 3, 'line'));
		this.dataLineBar.push(new ChartItem('Bar', [10, 20, 10, 15], '', '', true, true, false, 3));

		this.dataLineAnnotation.push(new ChartItem('Data Values', [2.4, 2, 1.8, 2.7, 2.5, 2.4, 2.3, 2.8, 2.3, 2.4, 2.7, 2.1, 1.9, 1.8],
			'', '', false, true, false, 3));
		this.chartLineAnnotations.push(new ChartLineAnnotation(new ChartLabelAnnotation(), 2.5,
			'horizontal', 'afterDatasetsDraw', 'line', [], '#000000', 1));
		this.chartLineAnnotations.push(new ChartLineAnnotation(new ChartLabelAnnotation('-1 SD', 'start', '#e53c29'), 1.5,
			'horizontal', 'afterDatasetsDraw', 'line', [5, 15], '#e53c29', 1));
		this.chartLineAnnotations.push(new ChartLineAnnotation(new ChartLabelAnnotation('+1 SD', 'start', '#e53c29'), 3.5,
			'horizontal', 'afterDatasetsDraw', 'line', [5, 15], '#e53c29', 1));
		this.chartLineAnnotations.push(new ChartLineAnnotation(new ChartLabelAnnotation('+2 SD', 'start', '#287ae5'), 4.5,
			'horizontal', 'afterDatasetsDraw', 'line', [5, 15], '#287ae5', 1));
		this.chartLineAnnotations.push(new ChartLineAnnotation(new ChartLabelAnnotation('-2 SD', 'start', '#287ae5'), 0.5,
			'horizontal', 'afterDatasetsDraw', 'line', [5, 15], '#287ae5', 1));
		for (let g = 1; g <= this.dataLineAnnotation[0].data.length; g++) {
			this.labelLineAnnotations.push(g);
		}

		this.chartMultipleAnnotations.push(new ChartLineAnnotation(new ChartLabelAnnotation(), 4.5,
			'horizontal', 'afterDatasetsDraw', 'line', [5, 15], '#287ae5', 1));
		this.chartMultipleAnnotations.push(new ChartLineAnnotation(new ChartLabelAnnotation(), 9,
			'horizontal', 'afterDatasetsDraw', 'line', [5, 15], '#287ae5', 1));
		this.chartMultipleAnnotations.push(new ChartLineAnnotation(new ChartLabelAnnotation('Label', 'start', '#287ae5'), -1,
			'horizontal', 'afterDatasetsDraw', 'line', [5, 15], '#287ae5', 1));
		this.chartMultipleAnnotations.push(new ChartLineAnnotation(new ChartLabelAnnotation(), 6,
			'vertical', 'afterDatasetsDraw', 'line', [], '#42f483', 1));

		/*Diagonal Annotation */
		this.chartMultipleAnnotations.push(new ChartLineAnnotation(new ChartLabelAnnotation(), -5,
			'horizontal', 'afterDatasetsDraw', 'line', [], '#000', 1, 20));
		this.chartMultipleAnnotations.push(new ChartBoxAnnotation('afterDatasetsDraw', 2, 10, 2, 10, 'box', '', '#cccccc'));
		this.chartMultipleAnnotations.push(new ChartBoxAnnotation('afterDatasetsDraw', 0, 12, 0, 12, 'box', '', '#5ac14b'));

		this.chartBubbleAnnotations.push(new ChartBoxAnnotation('afterDatasetsDraw', 2, 10, 2, 10, 'box', '', '#cccccc'));
		this.chartBubbleAnnotations.push(new ChartBoxAnnotation('afterDatasetsDraw', 0, 12, 0, 12, 'box', '', '#5ac14b'));

		this.dataBubbleAnnotations.push(new ChartItem('Test 1', [{x: 13, y: 13, r: 2}, {x: 1, y: 2, r: 2}, {x: 15, y: 23, r: 2},
			{x: -2, y: -2, r: 2}, {x: -10, y: 13, r: 2}, {x: 23, y: 12, r: 2}, {x: 4, y: 4, r: 2}, {x: 5, y: 6, r: 2},
			{x: 2, y: 3, r: 2}, {x: 1, y: 2, r: 2}, {x: 3, y: 2, r: 2}], '', '', true, false, false, 2));

		this.dataLineCustomLegend.push(new ChartItem('Line', [13, 20, 21, 15], '', '', false, true, false, 3, '',
			new ChartTooltipItem('title', 'label', 'afterlabel', true), undefined, undefined, 'line'));
		this.dataLineCustomLegend.push(new ChartItem('Dots', [11, 18, 4, 3], '', '', false, false, false,
			4, undefined, undefined, undefined, undefined, 'dots'));
		this.dataLineCustomLegend.push(new ChartItem('Line and Area', [12, 41, 1, 21], '', '', true, true,
			false, 3, undefined, undefined, undefined, undefined, 'bar'));

		this.chartLine = new ChartLine(0.5, 5, 2.5, 20, null, null);

	}

	private static randomIntFromInterval(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	public doAction() {}

	public doChange() {
		this.dataLine = [];
		const rnd = ShowcaseChartLegacyComponent.randomIntFromInterval(1, 4);
		for (let h = 1; h <= rnd; h++) {
			const dataRnd: Array<number> = [];
			for (let i = 1; i <= 4; i++) {
				dataRnd.push(ShowcaseChartLegacyComponent.randomIntFromInterval(3, 35));
			}
			let fill = false;
			if (ShowcaseChartLegacyComponent.randomIntFromInterval(0, 1) === 1) {
				fill = true;
			}
			this.dataLine.push(new ChartItem('Line ' + h, dataRnd, '', '', fill, true, false, 3));
		}
		this.lineChart.doUpdate();
	}

	public randomizeTimeLineChart() {
		this.dataTimeLine = [];
		const rnd = ShowcaseChartLegacyComponent.randomIntFromInterval(1, 4);
		for (let h = 1; h <= rnd; h++) {
			const dataRnd: Array<any> = [];
			for (let i = 1; i <= 4; i++) {
				const item = {
					t: new Date(ShowcaseChartLegacyComponent.randomIntFromInterval(2020, 2022),
						ShowcaseChartLegacyComponent.randomIntFromInterval(1, 11),
						ShowcaseChartLegacyComponent.randomIntFromInterval(1, 20)),
					y: ShowcaseChartLegacyComponent.randomIntFromInterval(1, 35)
				};
				dataRnd.push(item);
			}
			let fill = false;
			if (ShowcaseChartLegacyComponent.randomIntFromInterval(0, 1) === 1) {
				fill = true;
			}
			this.dataTimeLine.push(new ChartItem('Line ' + h, dataRnd, '', '', fill, true, false, 3));
		}
		this.timelineChart.doUpdate();
	}

	public updateMultipleAxisExample(): void {
		this.generateMultipleAxisExample();
		this.lineChartMultipleAxis.doUpdate();
	}

	public generateMultipleAxisExample(): void {
		this.dataLineMultipleAxis = [];

		this.multipleYAxisScales = [];
		this.multipleYAxisScales.push(this.generateChartMultipleYAxisScales('y-axis-0', 'left', 30, 105, 5));
		this.multipleYAxisScales.push(this.generateChartMultipleYAxisScales('y-axis-1', 'right', 0, 10, 2));

		this.chartLineMultipleAxisAnnotations.push(new ChartLineAnnotation(new ChartLabelAnnotation('Label', 'top'), 3,
			'vertical', 'afterDatasetsDraw', 'line', [], '#e53c29'));

		const rndData = ShowcaseChartLegacyComponent.randomIntFromInterval(1, 3);
		this.generateRandomData(rndData, 30, 105, 'y-axis-0', 'left');
		this.generateRandomData(rndData, 0, 10, 'y-axis-1', 'right');
	}

	public doResizeChart() {
		this.resizedImage = this.resizableChart.getResizedBase64Image(this.defaultResizeHeight, this.defaultResizeWidth);
	}

	public doUpdateChart() {
		this.resizableChart.chartResized = false;
		this.resizableChart.doUpdate();
		this.resizableChart.chart.resize();
	}

	private generateRandomData(rndNumberOfElements: number, min: number, max: number, yAxisID: string, position: string) {
		for (let h = 1; h <= rndNumberOfElements; h++) {
			const dataRnd: Array<number> = [];
			for (let i = 1; i <= 4; i++) {
				dataRnd.push(ShowcaseChartLegacyComponent.randomIntFromInterval(min, max));
			}
			let fill = false;
			if (ShowcaseChartLegacyComponent.randomIntFromInterval(0, 1) === 1) {
				fill = true;
			}
			this.dataLineMultipleAxis.push(new ChartItem(`Line ${h} ${position} axis`, dataRnd, '', '', fill, true, false, 3,
				'line', undefined, ShowcaseChartLegacyComponent.randomIntFromInterval(0, 3), yAxisID));
		}
	}

	private generateChartMultipleYAxisScales(id: string, position: string, min: number, max: number, stepSize: number):
		ChartMultipleYAxisScales {
		const defaultYAxisScales = new ChartMultipleYAxisScales();
		defaultYAxisScales.id = id;
		defaultYAxisScales.position = position;
		defaultYAxisScales.type = 'linear';
		defaultYAxisScales.gridLines = {display: true, drawBorder: true};
		defaultYAxisScales.scaleLabel = {display: true, labelString: this.yLabelAxis};

		defaultYAxisScales.ticks = {
			display:  true,
			min,
			max,
			stepSize,
		};

		return defaultYAxisScales;
	}

	private generateColorsForSections(length: number): Array<number[]> {
		const colorsArray: Array<number[]> = [];

		for (let i = 0; i < length; i++) {
			colorsArray.push(this.generateColorForSection(i));
		}

		return colorsArray;
	}

	private generateColorForSection(i: number): Array<number> {
		switch (i % 4) {
			case 0:
				return [255, 0, 0];
			case 1:
				return [0, 255, 0];
			case 2:
				return [0, 127, 200];
			default:
				return [255, 228, 181];
		}
	}
}

import {Component, ViewChild} from '@angular/core';
import {
	Annotation,
	ChartBoxAnnotation,
	ChartComponent,
	ChartItem,
	ChartLabelAnnotation,
	ChartLineAnnotation,
	ChartMultipleYAxisScales,
	ChartTooltipItem,
	ChartTooltipSettings
} from '../../../systelab-charts/chart/chart.component';

@Component({
	selector: 'showcase-chart',
	templateUrl: './showcase-chart.component.html'
})
export class ShowcaseChartComponent {

	@ViewChild('lineChart') lineChart: ChartComponent;
	@ViewChild('lineChartMultipleAxis') lineChartMultipleAxis: ChartComponent;
	@ViewChild('lineChartLegend') lineChartLegend: ChartComponent;

	public type: string;
	public itemSelected: any;
	public legend: boolean;
	public dataLine: Array<ChartItem> = [];
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
	public labelsMultipleAxis: Array<number> = [];
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

	private static randomIntFromInterval(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	constructor() {
		this.type = 'line';
		this.legend = true;
		this.labels = ['January', 'February', 'March', 'April'];
		this.labelsMultipleAxis = [1, 2, 3, 4];

		this.tooltipSettings.backgroundColor = '#ffffff';
		this.tooltipSettings.borderColor = '#0066ff';
		this.tooltipSettings.borderWidth = 3;
		this.tooltipSettings.bodyFontColor = '#6c757d';
		this.tooltipSettings.titleFontColor = '#fd7e14';

		this.generateMultipleAxisExample();

		this.dataLine.push(new ChartItem('Only Line', [13, 20, 21, 15], '', '', false, true, false, 3, '',
			new ChartTooltipItem('title', 'label', 'afterlabel', true)));

		this.dataLine.push(new ChartItem('Only Dots', [11, 18, 4, 3], '', '', false, false, false, 4));
		this.dataLine.push(new ChartItem('Line and Area', [12, 41, 1, 21], '', '', true, true, false, 3));

		this.dataBar.push(new ChartItem('Only Line', [12, 41, 1, 21], '', '', false, false, false, 3));
		this.dataBar.push(new ChartItem('Line and Area', [13, 20, 21, 15], '', '', true, true, false, 3));

		this.dataRadar.push(new ChartItem('Only Line', [36, 41, 35, 21], '', '', false, true, false, 3));
		this.dataRadar.push(new ChartItem('Line and Area', [37, 40, 21, 15], '', '', true, true, false, 3));

		this.dataDoughnut.push(new ChartItem('', [36, 23, 42, 52], '', '', true, true, false, 3));

		this.dataPie.push(new ChartItem('', [36, 23, 42, 52], '', '', true, true, false, 3));

		this.dataPolarArea.push(new ChartItem('', [21, 23, 42, 52], '', '', true, true, false, 3));

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
			'horizontal', 'beforeDatasetsDraw', 'line', [], '#000000', 1));
		this.chartLineAnnotations.push(new ChartLineAnnotation(new ChartLabelAnnotation('-1 SD', 'left', '#e53c29'), 1.5,
			'horizontal', 'beforeDatasetsDraw', 'line', [5, 15], '#e53c29', 1));
		this.chartLineAnnotations.push(new ChartLineAnnotation(new ChartLabelAnnotation('+1 SD', 'left', '#e53c29'), 3.5,
			'horizontal', 'beforeDatasetsDraw', 'line', [5, 15], '#e53c29', 1));
		this.chartLineAnnotations.push(new ChartLineAnnotation(new ChartLabelAnnotation('+2 SD', 'left', '#287ae5'), 4.5,
			'horizontal', 'beforeDatasetsDraw', 'line', [5, 15], '#287ae5', 1));
		this.chartLineAnnotations.push(new ChartLineAnnotation(new ChartLabelAnnotation('-2 SD', 'left', '#287ae5'), 0.5,
			'horizontal', 'beforeDatasetsDraw', 'line', [5, 15], '#287ae5', 1));
		for (let g = 1; g <= this.dataLineAnnotation[0].data.length; g++) {
			this.labelLineAnnotations.push(g);
		}

		this.chartMultipleAnnotations.push(new ChartLineAnnotation(new ChartLabelAnnotation(), 4.5,
			'horizontal', 'beforeDatasetsDraw', 'line', [5, 15], '#287ae5', 1));
		this.chartMultipleAnnotations.push(new ChartLineAnnotation(new ChartLabelAnnotation(), 9,
			'horizontal', 'beforeDatasetsDraw', 'line', [5, 15], '#287ae5', 1));
		this.chartMultipleAnnotations.push(new ChartLineAnnotation(new ChartLabelAnnotation('Label', 'left', '#287ae5'), -1,
			'horizontal', 'beforeDatasetsDraw', 'line', [5, 15], '#287ae5', 1));
		this.chartMultipleAnnotations.push(new ChartLineAnnotation(new ChartLabelAnnotation(), 6,
			'vertical', 'beforeDatasetsDraw', 'line', [], '#42f483', 1));

		/*Diagonal Annotation */
		this.chartMultipleAnnotations.push(new ChartLineAnnotation(new ChartLabelAnnotation(), -5,
			'horizontal', 'beforeDatasetsDraw', 'line', [], '#000', 1, 20));
		this.chartMultipleAnnotations.push(new ChartBoxAnnotation('beforeDatasetsDraw', 2, 10, 2, 10, 'box', '', '#cccccc'));
		this.chartMultipleAnnotations.push(new ChartBoxAnnotation('beforeDatasetsDraw', 0, 12, 0, 12, 'box', '', '#5ac14b'));

		this.chartBubbleAnnotations.push(new ChartBoxAnnotation('beforeDatasetsDraw', 2, 10, 2, 10, 'box', '', '#cccccc'));
		this.chartBubbleAnnotations.push(new ChartBoxAnnotation('beforeDatasetsDraw', 0, 12, 0, 12, 'box', '', '#5ac14b'));

		this.dataBubbleAnnotations.push(new ChartItem('Test 1', [{x: 13, y: 13, r: 2}, {x: 1, y: 2, r: 2}, {x: 15, y: 23, r: 2},
			{x: -2, y: -2, r: 2}, {x: -10, y: 13, r: 2}, {x: 23, y: 12, r: 2}, {x: 4, y: 4, r: 2}, {x: 5, y: 6, r: 2},
			{x: 2, y: 3, r: 2}, {x: 1, y: 2, r: 2}, {x: 3, y: 2, r: 2}], '', '', true, false, false, 2));

		this.dataLineCustomLegend.push(new ChartItem('Line', [13, 20, 21, 15], '', '', false, true, false, 3, '',
			new ChartTooltipItem('title', 'label', 'afterlabel', true), undefined, undefined, 'line'));
		this.dataLineCustomLegend.push(new ChartItem('Dots', [11, 18, 4, 3], '', '', false, false, false, 4, undefined, undefined, undefined, undefined, 'dots'));
		this.dataLineCustomLegend.push(new ChartItem('Line and Area', [12, 41, 1, 21], '', '', true, true, false, 3, undefined, undefined, undefined, undefined, 'bar'));
	}

	public doAction(event: any) {
		const xValue = this.labels[this.itemSelected._index];
		const yValue = this.dataPie[0].data[this.itemSelected._index];
		console.log(xValue);
		console.log(yValue);
	}

	public doChange() {
		this.dataLine = [];
		const rnd = ShowcaseChartComponent.randomIntFromInterval(1, 4);
		for (let h = 1; h <= rnd; h++) {
			const dataRnd: Array<number> = [];
			for (let i = 1; i <= 4; i++) {
				dataRnd.push(ShowcaseChartComponent.randomIntFromInterval(3, 35));
			}
			let fill = false;
			if (ShowcaseChartComponent.randomIntFromInterval(0, 1) === 1) {
				fill = true;
			}
			this.dataLine.push(new ChartItem('Line ' + h, dataRnd, '', '', fill, true, false, 3));
		}
		this.lineChart.doUpdate();
	}

	public updateMultipleAxisExample() {
		this.generateMultipleAxisExample();
		this.lineChartMultipleAxis.doUpdate();
	}

	public generateMultipleAxisExample() {
		this.dataLineMultipleAxis = [];

		this.multipleYAxisScales = [];
		this.multipleYAxisScales.push(this.generateChartMultipleYAxisScales('y-axis-0', 'left', 30, 105, 5));
		this.multipleYAxisScales.push(this.generateChartMultipleYAxisScales('y-axis-1', 'right', 0, 10, 2));

		this.chartLineMultipleAxisAnnotations.push(new ChartLineAnnotation(new ChartLabelAnnotation('Label', 'top'), 3,
			'vertical', 'beforeDatasetsDraw', 'line', [], '#e53c29'));

		const rndData = ShowcaseChartComponent.randomIntFromInterval(1, 3);
		this.generateRandomData(rndData, 30, 105, 'y-axis-0', 'left');
		this.generateRandomData(rndData, 0, 10, 'y-axis-1', 'right');
	}

	private generateRandomData(rndNumberOfElements: number, min: number, max: number, yAxisID: string, position: string) {
		for (let h = 1; h <= rndNumberOfElements; h++) {
			const dataRnd: Array<number> = [];
			for (let i = 1; i <= 4; i++) {
				dataRnd.push(ShowcaseChartComponent.randomIntFromInterval(min, max));
			}
			let fill = false;
			if (ShowcaseChartComponent.randomIntFromInterval(0, 1) === 1) {
				fill = true;
			}
			this.dataLineMultipleAxis.push(new ChartItem('Line ' + h + ' ' + position + ' axis', dataRnd, '', '', fill, true, false, 3,
				'line', undefined, ShowcaseChartComponent.randomIntFromInterval(0, 3), yAxisID));
		}
	}

	private generateChartMultipleYAxisScales(id: string, position: string, min: number, max: number,
											 stepSize: number): ChartMultipleYAxisScales {
		const defaultYAxisScales = new ChartMultipleYAxisScales();
		defaultYAxisScales.id = id;
		defaultYAxisScales.position = position;
		defaultYAxisScales.type = 'linear';
		defaultYAxisScales.gridLines = {display: true, drawBorder: true};
		defaultYAxisScales.scaleLabel = {display: true, labelString: this.yLabelAxis};

		defaultYAxisScales.ticks = {
			min: min,
			max: max,
			display: true,
			stepSize: stepSize
		};

		return defaultYAxisScales;
	}
}

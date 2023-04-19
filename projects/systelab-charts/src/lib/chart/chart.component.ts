import { AfterViewInit, ApplicationRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Chart, InteractionMode, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';
import annotationPlugin from 'chartjs-plugin-annotation';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { DecimalFormat } from '../../assets/js/decimalFormat';
import { format } from 'date-fns/esm';
import 'chartjs-plugin-annotation';
import { arrayToObject } from '../utils';

Chart.register(...registerables, ChartDataLabels, annotationPlugin);

interface MultipleAxis {
	id:         string;
	type:       string;
	position:   string;
	stacked:    boolean;
	max: number;
	min: number;
	ticks: {
		min: number;
		max: number;
		stepSize?: number;
		display?: boolean;
		callbackFunction? (any): any;
	};
	grid: {
		display: boolean;
		drawBorder: boolean;
	};
	title: {
		text: string;
	};
}


export class ChartItem {

	constructor(public label: string, public data: Array<any>, public borderColor?: string,
				public backgroundColor?: string, public fill?: boolean, public showLine?: boolean,
				public isGradient?: boolean, public borderWidth?: number,
				public chartType?: string, public chartTooltipItem?: ChartTooltipItem | Array<ChartTooltipItem>,
				public pointRadius?: number, public yAxisID?: string, public legendType?: string,
				public labelBorderColors?: Array<number[]>, public labelBackgroundColors?: Array<number[]>) {
	}
}

export class Annotation {
	constructor(public drawTime: string, public type: string, public borderColor?: string, public borderWidth?: number,
				public scaleId = 'yAxis') {
	}
}

export class ChartLineAnnotation extends Annotation {
	constructor(public label: ChartLabelAnnotation, public value: number, public orientation: string, drawTime: string,
				type: string, public borderDash?: Array<number>, borderColor?: string, borderWidth?: number, public endValue?: number) {
		super(drawTime, type, borderColor, borderWidth);
	}
}

export class ChartLine {
	constructor(public xMinValue: number, public yMinValue: number, public xMaxValue: number, public yMaxValue: number,
		public borderColor?: string, public borderWidth?: number) {
	}
}

export class ChartBoxAnnotation extends Annotation {
	constructor(drawTime: string, public xMin: number, public xMax: number, public yMin: number, public yMax: number,
				type: string, public backgroundColor?: string, borderColor?: string, borderWidth?: number) {
		super(drawTime, type, borderColor, borderWidth);
	}
}

export class ChartLabelAnnotation {
	constructor(public text?: string, public position?: string, public backgroundColor?: string, public fontStyle?: string,
				public fontColor?: string) {
	}
}

export class ChartTooltipItem {
	constructor(public title?: string, public label?: string, public afterLabel?: string, public valueInAfterLabel?: boolean,
				public numberFormat?: string) {
	}
}

export class ChartTooltipSettings {
	constructor(public backgroundColor?: string, public borderColor?: string, public borderWidth?: number, public bodyFontColor?: string,
				public bodyFontSize?: number, public titleFontSize?: number, public titleFontColor?: string) {
		this.bodyFontColor = '#ffffff';
		this.borderColor = 'rgba(0,0,0,0)';
		this.borderWidth = 0;
		this.bodyFontSize = 12;
		this.titleFontSize = 12;
		this.titleFontColor = '#ffffff';
		this.backgroundColor = 'rgba(0,0,0,0.8)';
	}
}

export class ChartLabelSettings {
	constructor(public position?: ChartLabelPosition, public labelColors?: ChartLabelColor, public chartLabelFont?: ChartLabelFont,
				public chartLabelPadding?: ChartLabelPadding, public chartLabelText?: ChartLabelText,
				public formatter?: (value: any, context: any) => string) {
		this.position = new ChartLabelPosition();
		this.labelColors = new ChartLabelColor();
		this.chartLabelFont = new ChartLabelFont();
		this.chartLabelPadding = new ChartLabelPadding();
		this.chartLabelText = new ChartLabelText();
	}

}

export class ChartLabelPosition {
	constructor(public align?: string | number, public anchor?: string, public clamp?: boolean, public clip?: boolean,
				public display?: ((context: any) => (boolean | string)) | boolean | string, public offset?: number,
				public rotation?: number) {
	}
}

export class ChartLabelColor {
	constructor(public backgroundColor?: string, public color?: string, public borderColor?: string, public borderRadius?: number,
				public borderWidth?: number, public opacity?: number) {

	}
}

export class ChartLabelFont {
	constructor(public font?: object, public family?: string, public size?: number, public style?: string, public weight?: string | number,
				public lineHeight?: string | number) {

	}
}

export class ChartLabelPadding {
	constructor(public padding?: number | object, public top?: number, public right?: number, public bottom?: number,
				public left?: number) {

	}
}

export class ChartLabelText {
	constructor(public textAlign?: string, public textStrokeColor?: string, public textShadowBlur?: number,
				public textStrokeWidth?: number, public textShadowColor?: string) {

	}
}

export class ChartMultipleYAxisScales {
	constructor(public id?: string, public type?: string, public position?: string,
				public stacked = false,
				public ticks?: { min: number; max: number; stepSize?: number; display?: boolean },
				public gridLines?: { display: boolean; drawBorder: boolean },
				public scaleLabel?: { display: boolean; labelString: string }) {
	}

	public getScaleDefinition(callbackFunction?: (value, index, values) => string): MultipleAxis {
		return {
			id:         this.id,
			type:       this.type,
			position:   this.position,
			stacked:    this.stacked,
			max: this.ticks.max,
			min: this.ticks.min,
			ticks: {
				...this.ticks,
				...callbackFunction ? {
					callback: callbackFunction
				} : {}
			},
			grid:  this.gridLines,
			title: {
				text: this.scaleLabel.labelString,
			}
		};
	}
}

export class ChartIntersectionSettings {
	public intersect: boolean;
	public mode: string;

	constructor(intersect = false, mode: InteractionMode = 'index') {
		this.intersect = intersect;
		this.mode = mode;
	}
}

@Component({
	selector:    'systelab-chart',
	templateUrl: './chart.component.html'
})
export class ChartComponent implements AfterViewInit {

	@ViewChild('canvas', {static: true}) canvas: ElementRef;
	@ViewChild('topLegend', {static: false}) topLegend: ElementRef;
	@ViewChild('bottomLegend', {static: false}) bottomLegend: ElementRef;

	@Input() labels: Array<any> = [];
	@Input() data: Array<ChartItem> = [];
	@Input() annotations: Array<Annotation | ChartLineAnnotation | ChartBoxAnnotation> = [];
	@Input() showLegend = true;
	@Input() legendPosition = 'top';
	@Input() intersectionSettings: ChartIntersectionSettings = new ChartIntersectionSettings();
	@Input() isHorizontal = false;
	@Input() yMinValue: any;
	@Input() yMaxValue: any;
	@Input() xMinValue: any;
	@Input() xMaxValue: any;
	@Input() xAutoSkip = true;
	@Input() yLabelAxis: string;
	@Input() xLabelAxis: string;
	@Input() lineTension: number;
	@Input() isBackgroundGrid = true;
	@Input() type: string;
	@Input() responsive = true;
	@Input() maintainAspectRatio = true;
	@Input() tooltipSettings: ChartTooltipSettings;
	@Input() chartLabelSettings: ChartLabelSettings;
	@Input() isStacked = false;
	@Input() animationDuration = 1000;
	@Input() minValueForRadar: number;
	@Input() maxValueForRadar: number;
	@Input() multipleYAxisScales: ChartMultipleYAxisScales[];
	@Input() timeScale = false;
	@Input() timeUnit = 'day';
	@Input() tooltipTimeFormat = 'd/M/yyyy';
	@Input() customLegend = false;
	@Input() legendWithoutBox = false;
	@Input() hideInitialAndFinalTick = false;
	@Input() hideFinalTick = false;
	@Input() chartLine: ChartLine;

	@Output() itemSelectedChange = new EventEmitter();
	@Output() action = new EventEmitter();

	public chart: Chart;
	public chartResized = false;

	private defaultColors: Array<number[]> = [
		[255, 99, 132],
		[54, 162, 235],
		[255, 206, 86],
		[75, 192, 192],
		[220, 220, 220],
		[247, 70, 74],
		[70, 191, 189],
		[253, 180, 92],
		[148, 159, 177],
		[151, 187, 205],
		[231, 233, 237],
		[77, 83, 96]];
	private _itemSelected: any;
	private dataset: Array<any> = [];

	private _annotations: Array<any> = [];
	private axesVisible = true;
	private yAxisLabelVisible = false;
	private xAxisLabelVisible = false;

	constructor(private readonly appRef: ApplicationRef) {
		Chart.defaults.interaction.intersect = this.intersectionSettings.intersect;
		// @ts-ignore
		Chart.defaults.interaction.mode = this.intersectionSettings.mode;
	}

	@Input()
	get itemSelected(): any {
		return this._itemSelected;
	}
	set itemSelected(value: any) {
		this._itemSelected = value;
		this.itemSelectedChange.emit(this._itemSelected);
	}

	public ngAfterViewInit(): void {
		let cx: CanvasRenderingContext2D;

		if (!this.tooltipSettings) {
			this.tooltipSettings = new ChartTooltipSettings();
		}

		if (this.canvas.nativeElement) {
			cx = this.canvas.nativeElement.getContext('2d');
		}

		if (this.customLegend) {
			this.initCustomLegend();
		}

		this.setData(cx);

		this.setAxisVisibility();

		this.addAnnotations();
		this.drawChart(cx);
		if (this.customLegend && this.data.filter(obj => obj.legendType != null).length === this.data.length) {
			this.buildCustomLegend();
		}
	}

	public rgba(colour: Array<number>, alpha: number): string {
		return 'rgba(' + colour.concat(alpha)
			.join(',') + ')';
	}

	public getResizedBase64Image(height?: number, width?: number): string {
		let base64ImageString: string;
		if (this.chart) {
			if (width || height) {

				const canvasOffsetHeight = this.chart.canvas.parentElement.offsetHeight;
				const canvasOffsetWidth = this.chart.canvas.parentElement.offsetWidth;
				const originalAspectRatio = this.maintainAspectRatio;
				const originalResponsive = this.responsive;
				this.responsive = false;
				this.maintainAspectRatio = false;
				this.chart.resize();
				if (this.doResizeChart(height, width)) {
					this.appRef.tick();

					this.chart.resize();
					base64ImageString = this.chart.toBase64Image();
					this.maintainAspectRatio = originalAspectRatio;
					this.responsive = originalResponsive;
					this.chartResized = false;
					this.doResizeChart(canvasOffsetHeight, canvasOffsetWidth);
					this.doUpdate();

				}
			} else {
				base64ImageString = this.chart.toBase64Image();
			}
			return base64ImageString;
		}
		return undefined;
	}

	public doResizeChart(height: number, width: number): boolean {
		const elementToResize = this.chart.canvas.parentElement;
		let doResize = false;
		if (height) {
			doResize = true;
			elementToResize.style.height = height + 'px';
		}
		if (width) {
			doResize = true;
			elementToResize.style.width = width + 'px';
		}
		this.chartResized = doResize;
		return doResize;
	}

	public doUpdate(): void {
		let cx: CanvasRenderingContext2D;
		if (this.canvas.nativeElement) {
			cx = this.canvas.nativeElement.getContext('2d');
		}
		this.chart.destroy();

		this.setAxisVisibility();

		this.dataset = [];
		this._annotations = [];
		this.setData(cx);
		this.addAnnotations();
		this.drawChart(cx);
		if (this.customLegend && this.data.filter(obj => obj.legendType != null).length === this.data.length) {
			this.buildCustomLegend();
		}
	}

	public drawLine(chartData, chartLine: ChartLine) {
		const scales = (chartData.chart as any).scales;

		let cx: CanvasRenderingContext2D;
		if (this.canvas.nativeElement) {
			cx = this.canvas.nativeElement.getContext('2d');
		}

		let xScale: any;
		let yScale: any;
		Object.keys(scales)
			.forEach(
				k => (k[0] === 'x' && (xScale = scales[k])) || (yScale = scales[k])
			);

		const getXY = (x: number, y: number) => ({
			x: xScale.getPixelForValue(x, undefined, undefined, true),
			y: yScale.getPixelForValue(y)
		});

		const initPoint = getXY(chartLine.xMinValue, chartLine.yMinValue);
		const endPoint = getXY(chartLine.xMaxValue, chartLine.yMaxValue);

		cx.beginPath();
		cx.lineWidth = chartLine.borderWidth || 1;
		cx.moveTo(initPoint.x, initPoint.y);
		cx.lineTo(endPoint.x, endPoint.y);
		cx.strokeStyle = chartLine.borderColor || 'black';
		cx.stroke();
		cx.closePath();
		cx.restore();
	}

	private initCustomLegend() {
		this.showLegend = false;
	}

	private buildCustomLegend() {
		let legendItems = [];
		if (this.legendPosition === 'top') {
			legendItems = this.topLegend.nativeElement.getElementsByTagName('li');
		} else {
			legendItems = this.bottomLegend.nativeElement.getElementsByTagName('li');
		}
		for (let i = 0; i < legendItems.length; i += 1) {
			legendItems[i].addEventListener('click', this.legendClickCallback.bind(this), false);
		}
	}

	private drawChart(cx: CanvasRenderingContext2D) {
		const tooltipTimeFormatConstant = this.tooltipTimeFormat;
		/* Draw the chart */
		if (this.canvas.nativeElement) {
			const definition: any = {
				type: this.type,
				data: {
					labels:   this.labels,
					datasets: this.dataset
				},

				options: {
					animation: {
						duration: this.animationDuration,
						onComplete: (chartData) => {
							if (this.chartLine) {
								this.drawLine(chartData, this.chartLine);
							}
						}
					},
					responsive:          this.responsive,
					maintainAspectRatio: this.maintainAspectRatio,
					onClick:             (evt, item) => {
						const e = item[0];
						if (e) {
							this.itemSelected = e;
							this.action.emit();
						}
					},
					elements:            {
						line: {
							tension: this.lineTension
						}
					},
					display:             true,
					legend:              {
						display:  this.showLegend,
						position: this.legendPosition,
						...this.legendWithoutBox ? {
							labels: {
								boxWidth: 0
						}} : {}
					},
					legendCallback: (chart) => this.legendCallback(chart),
					scales: this.type !== 'pie' ? this.scales() : {},
					plugins: {
						annotation:          {
							events:      ['click'],
							annotations: arrayToObject(this._annotations, item => item.id),
						},
						tooltips:            {
							position:        this.type === 'bar' ? 'nearest' : 'average',
							callbacks:       {
								title: (tooltipItem, data) => this.tooltipTitle(tooltipItem, data),
								label: (tooltipItem, data) => this.tooltipLabel(tooltipItem, tooltipTimeFormatConstant, data),
								afterLabel: (tooltipItem, data) => this.tooltipAfterLabel(tooltipItem, data),
							},
							backgroundColor: this.tooltipSettings.backgroundColor,
							titleFontSize:   this.tooltipSettings.titleFontSize,
							titleFontColor:  this.tooltipSettings.titleFontColor,
							bodyFontColor:   this.tooltipSettings.bodyFontColor,
							bodyFontSize:    this.tooltipSettings.bodyFontSize,
							borderColor:     this.tooltipSettings.borderColor,
							borderWidth:     this.tooltipSettings.borderWidth
						}
					},
				},
			};

			if (this.type === 'bar' && this.isHorizontal) {
				definition.options.indexAxis = 'y';
			}

			if (this.type === 'radar') {
				definition.options.scale = {
					ticks: {
						min: this.minValueForRadar,
						max: this.maxValueForRadar
					}
				};
			}

			if (this.chartLabelSettings) {
				definition.options = {
					...definition.options,
					plugins: {
						...definition.options.plugins,
						datalabels: {
							align:           this.chartLabelSettings.position.align,
							anchor:          this.chartLabelSettings.position.anchor,
							backgroundColor: this.chartLabelSettings.labelColors.backgroundColor,
							borderColor:     this.chartLabelSettings.labelColors.borderColor,
							borderRadius:    this.chartLabelSettings.labelColors.borderRadius,
							borderWidth:     this.chartLabelSettings.labelColors.borderWidth,
							clamp:           this.chartLabelSettings.position.clamp,
							clip:            this.chartLabelSettings.position.clip,
							color:           this.chartLabelSettings.labelColors.color,
							display:         this.chartLabelSettings.position.display,
							font:            this.initDatalabelsFontProperties(this.chartLabelSettings.chartLabelFont),
							formatter:       this.chartLabelSettings.formatter,
							offset:          this.chartLabelSettings.position.offset,
							opacity:         this.chartLabelSettings.labelColors.opacity,
							padding:         this.initDatalabelsPaddingProperties(this.chartLabelSettings.chartLabelPadding),
							rotation:        this.chartLabelSettings.position.rotation,
							textAlign:       this.chartLabelSettings.chartLabelText.textAlign,
							textStrokeColor: this.chartLabelSettings.chartLabelText.textStrokeColor,
							textStrokeWidth: this.chartLabelSettings.chartLabelText.textStrokeWidth,
							textShadowBlur:  this.chartLabelSettings.chartLabelText.textShadowBlur,
							textShadowColor: this.chartLabelSettings.chartLabelText.textShadowColor
						}
					}
				};
			} else {
				definition.options = {
					...definition.options,
					plugins: {
						...definition.options.plugins,
						datalabels: {
							display: false,
						}
					}
				};
			}
			this.chart = new Chart(cx, definition);
		}
	}

	private legendCallback(chart) {
		const text = [];
		text.push('<ul class="' + chart.id + '-legend">');
		const data = chart.data;
		const dataSets = data.datasets;
		if (dataSets.length) {
			for (let i = 0; i < dataSets.length; i++) {
				text.push('<li>');
				if (dataSets[i].legendType) {
					if (dataSets[i].borderColor && dataSets[i].backgroundColor) {
						if (dataSets[i].backgroundColor === 'transparent') {
							text.push(`<span class="${dataSets[i].legendType}" style="background-color: ${dataSets[i].borderColor};
								border-color: ${dataSets[i].borderColor}"></span>`);
						} else if (dataSets[i].borderColor === 'transparent') {
							text.push(`<span class="${dataSets[i].legendType}" style="background-color: ${dataSets[i].backgroundColor};
								border-color: ${dataSets[i].backgroundColor}"></span>`);
						} else {
							text.push(`<span class="${dataSets[i].legendType}" style="background-color: ${dataSets[i].backgroundColor};
								border-color: ${dataSets[i].borderColor}"></span>`);
						}
					} else if (dataSets[i].borderColor) {
						text.push(`<span class="${dataSets[i].legendType}" style="border-color: ${dataSets[i].borderColor}"></span>`);
					} else if (dataSets[i].backgroundColor) {
						text.push(`<span class="${dataSets[i].legendType}" 
										 style="background-color: ${dataSets[i].backgroundColor}"></span>`);
					}
				}
				text.push(dataSets[i].label);
				text.push('</li>');
			}
		}
		text.push('</ul>');
		return text.join('');
	}

	private scales() {
		const yAxisMultipleArray: MultipleAxis[] = this.multipleYAxisScales ?
		 	this.multipleYAxisScales.map(y => y.getScaleDefinition(
		 		this.hideInitialAndFinalTick ? this.removeInitialAndFinalTick : this.hideFinalTick ? this.removeFinalTick : null)
			) : null;
		const yAxisMultiple = this.multipleYAxisScales ? arrayToObject(yAxisMultipleArray, i => i.id) : null;
		const yAxis = {
			stacked:    this.isStacked,
			min:     this.yMinValue,
			max:     this.yMaxValue,
			ticks:      {
				display: this.axesVisible,
				...this.hideInitialAndFinalTick ? {
					callback: this.removeInitialAndFinalTick
				} : {},
				...this.hideFinalTick ? {
					callback: this.removeFinalTick
				} : {}
			},
			grid:  {
				display:    this.isBackgroundGrid,
				drawBorder: this.axesVisible
			},
			title: {
				display:     this.yAxisLabelVisible,
				text: this.yLabelAxis
			}
		};
		const timeScale = this.timeScale ? {
			type: 'time',
			distribution: 'linear',
			time: {
				unit: this.timeUnit,
				minUnit: 'minute'
			}
		} : {};
		const xAxis = {
			stacked:    this.isStacked,
			min:      this.xMinValue,
			max:      this.xMaxValue,
			ticks:      {
				display:  this.axesVisible,
				autoSkip: this.xAutoSkip,
				...this.hideInitialAndFinalTick ? {
					callback: this.removeInitialAndFinalTick
				} : {},
				...this.hideFinalTick ? {
					callback: this.removeFinalTick
				} : {}
			},
			grid:  {
				display:    this.isBackgroundGrid,
				drawBorder: this.axesVisible
			},
			title: {
				display:     this.xAxisLabelVisible,
				text: this.xLabelAxis
			}
		};

		let scales = {
			x: {
				...timeScale,
				...xAxis,
			},
			yAxis: undefined,
		};

		if (this.multipleYAxisScales) {
			scales = {
				...scales,
				...yAxisMultiple,
			};
			delete scales.yAxis;
		} else {
			scales = {
				...scales,
				yAxis,
			};
		}

		return scales;
	}

	private tooltipTitle(tooltipItem, data) {
		const item = data.datasets[tooltipItem[0].datasetIndex];

		if (item.chartTooltipItem) {
			const chartTooltipItem = item.chartTooltipItem instanceof Array ?
				item.chartTooltipItem[tooltipItem[0].index] : item.chartTooltipItem;
			if (chartTooltipItem.title) {
				return chartTooltipItem.title;
			}
		}
	}

	private tooltipLabel(tooltipItem, tooltipTimeFormatConstant, data) {
		const item = data.datasets[tooltipItem.datasetIndex];
		let label = data.datasets[tooltipItem.datasetIndex].label;
		if (!label) {
			label = data.labels[tooltipItem.index];
		}
		const val = item.data[tooltipItem.index];
		let rt;
		let rtVal: number;
		if (val instanceof Object) {
			if (val.t) {
				if(val.t instanceof Date){
					const dataValue = '(' + (val.x ? val.x + ',' : '') + val.y + ')';
					rt = format(val.t , tooltipTimeFormatConstant) + dataValue;
				} else {
					rt = val.t;
				}

			} else {
				rt = '(' + val.x + ',' + val.y + ')';
			}
		} else {
			rt = val;
			rtVal = val;
		}
		if (item.chartTooltipItem) {
			const chartTooltipItem = item.chartTooltipItem instanceof Array ?
				item.chartTooltipItem[tooltipItem.index] : item.chartTooltipItem;

			if (!isNaN(rtVal) && chartTooltipItem.numberFormat) {
				rt = new DecimalFormat(chartTooltipItem.numberFormat).format(val);
			}

			if (chartTooltipItem.label) {
				label = chartTooltipItem.label;
			}
			if (!chartTooltipItem.valueInAfterLabel) {
				label += ': ' + rt;
			}
		} else {
			label += ': ' + rt;
		}
		return label;
	}

	private tooltipAfterLabel(tooltipItem, data) {
		const item = data.datasets[tooltipItem.datasetIndex];
		let afterLabel = '';

		if (item.chartTooltipItem) {
			const chartTooltipItem = item.chartTooltipItem instanceof Array ?
				item.chartTooltipItem[tooltipItem.index] : item.chartTooltipItem;
			if (chartTooltipItem.afterLabel) {
				afterLabel = chartTooltipItem.afterLabel;
			}
			if (chartTooltipItem.valueInAfterLabel) {
				const val = data[tooltipItem.index];
				let rt;
				if (val instanceof Object) {
					if (val.t) {
						rt = val.t;
					} else {
						rt = '(' + val.x + ',' + val.y + ')';
					}
				} else {
					if (!isNaN(val) && chartTooltipItem.numberFormat) {
						rt = new DecimalFormat(chartTooltipItem.numberFormat).format(val);
					} else {
						rt = val;
					}
				}
				afterLabel += ' (' + rt + ')';
			}
		}
		return afterLabel;
	}

	private removeInitialAndFinalTick(value, index, values): string {
		return index === 0 || index === values.length - 1 ? '' : value;
	}

	private removeFinalTick(value, index): string {
		return index === 0 ? '' : value;
	}

	private initDatalabelsFontProperties(chartLabelText: ChartLabelFont): object {
		let font: any;

		if (chartLabelText.font) {
			font = chartLabelText.font;
		} else {
			font = {};
		}

		if (chartLabelText.family) {
			font.family = chartLabelText.family;
		}

		if (chartLabelText.size) {
			font.size = chartLabelText.size;
		}

		if (chartLabelText.style) {
			font.style = chartLabelText.style;
		}

		if (chartLabelText.weight) {
			font.weight = chartLabelText.weight;
		}

		if (chartLabelText.lineHeight) {
			font.lineHeight = chartLabelText.lineHeight;
		}

		return font;
	}

	private initDatalabelsPaddingProperties(chartLabelPadding: ChartLabelPadding): object {

		let padding: any;

		if (chartLabelPadding.padding) {
			padding = chartLabelPadding.padding;
		} else {
			padding = {};
		}

		if (chartLabelPadding.top) {
			padding.top = chartLabelPadding.top;
		}

		if (chartLabelPadding.right) {
			padding.right = chartLabelPadding.right;
		}

		if (chartLabelPadding.bottom) {
			padding.bottom = chartLabelPadding.bottom;
		}

		if (chartLabelPadding.left) {
			padding.left = chartLabelPadding.left;
		}

		return padding;
	}

	private setData(cx: CanvasRenderingContext2D) {

		let borderColors: any;
		let backgroundColors: any;

		if (this.data) {
			let colorNumber = 0;

			for (let i = 0; i < this.data.length; i++) {
				colorNumber = i;
				if (this.data[i].isGradient) {
					const gradientStroke = cx.createLinearGradient(500, 0, 100, 0);
					gradientStroke.addColorStop(0, this.rgba(this.defaultColors[0], 1));
					gradientStroke.addColorStop(1, this.rgba(this.defaultColors[1], 1));
					borderColors = gradientStroke;
					backgroundColors = gradientStroke;
				} else if ((this.type === 'pie' || this.type === 'doughnut' || this.type === 'polarArea') && !this.data[i].chartType) {
					const backgroundColorList: Array<any> = [];
					const borderColorList: Array<any> = [];
					for (let j = 0; j < this.data[i].data.length; j++) {
						if (this.data[i].labelBorderColors && this.data[i].labelBorderColors[j]) {
							borderColorList.push(this.rgba(this.data[i].labelBorderColors[j], 1));
						} else {
							borderColorList.push(this.rgba(this.defaultColors[colorNumber], 1));
						}
						if (this.data[i].labelBackgroundColors && this.data[i].labelBackgroundColors[j]) {
							backgroundColorList.push(this.rgba(this.data[i].labelBackgroundColors[j], 1));
						} else {
							backgroundColorList.push(this.rgba(this.defaultColors[colorNumber], 1));
						}

						colorNumber++;
						if (colorNumber > (this.defaultColors.length - 1)) {
							colorNumber = 0;
						}
					}
					borderColors = borderColorList;
					backgroundColors = backgroundColorList;
				} else {
					if (colorNumber > (this.defaultColors.length - 1)) {
						colorNumber = 0;
					}
					if (!this.data[i].borderColor) {
						this.data[i].borderColor = this.rgba(this.defaultColors[colorNumber], 1);
					}
					if (!this.data[i].backgroundColor) {
						if (this.data[i].fill) {
							this.data[i].backgroundColor = this.rgba(this.defaultColors[colorNumber], 0.6);
						} else {
							this.data[i].backgroundColor = 'transparent';
						}
					}
					borderColors = this.data[i].borderColor;
					backgroundColors = this.data[i].backgroundColor;
				}
				this.dataset.push({
					yAxisID:          this.data[i].yAxisID,
					label:            this.data[i].label,
					data:             this.data[i].data,
					borderColor:      borderColors,
					backgroundColor:  backgroundColors,
					fill:             this.data[i].fill,
					type:             this.data[i].chartType,
					borderWidth:      this.data[i].borderWidth,
					showLine:         this.data[i].showLine,
					pointRadius:      this.data[i].pointRadius,
					chartTooltipItem: this.data[i].chartTooltipItem,
					legendType:       this.data[i].legendType
				});
			}
		}

	}

	private addAnnotations() {
		if (this.annotations) {
			for (let i = 0; i < this.annotations.length; i++) {
				if (this.annotations[i] instanceof ChartLineAnnotation) {
					this.addLineAnnotation(
						this.annotations[i] as ChartLineAnnotation,
						this.rgba(this.defaultColors[this.getColorNumber(i)], 1),
						this.rgba(this.defaultColors[this.getColorNumber(i) + 1], 1));
				}
				if (this.annotations[i] instanceof ChartBoxAnnotation) {
					this.addBoxAnnotation(
						this.annotations[i] as ChartBoxAnnotation,
						this.rgba(this.defaultColors[this.getColorNumber(i)], 1)
					);

				}
			}
		}
	}

	private addLineAnnotation(lineAnnotation: ChartLineAnnotation, defaultBorderColor: any, defaultBackgroundColor: any) {

		if (!lineAnnotation.borderColor) {
			lineAnnotation.borderColor = defaultBorderColor;
		}
		if (!lineAnnotation.borderWidth) {
			lineAnnotation.borderWidth = 2;
		}

		if (lineAnnotation.label) {
			if (!lineAnnotation.label.backgroundColor) {
				lineAnnotation.label.backgroundColor = defaultBackgroundColor;
			}
			if (!lineAnnotation.label.position) {
				lineAnnotation.label.position = 'center';
			}
			if (!lineAnnotation.label.fontColor) {
				lineAnnotation.label.fontColor = '#ffffff';
			}
			if (!lineAnnotation.label.fontStyle) {
				lineAnnotation.label.fontStyle = 'normal';
			}
		}
		const annotations = {
			drawTime:    lineAnnotation.drawTime,
			id: 		 'annotation' + (this._annotations.length + 1),
			type:        lineAnnotation.type,
			value:		 lineAnnotation.orientation === 'vertical' ? lineAnnotation.value.toString(): lineAnnotation.value,
			endValue:    lineAnnotation.endValue,
			borderColor: lineAnnotation.borderColor,
			borderWidth: lineAnnotation.borderWidth,
			borderDash:  lineAnnotation.borderDash,
			scaleID:     lineAnnotation.orientation === 'vertical' ? 'x' : lineAnnotation.scaleId,
		};

		let label = {};
		if (lineAnnotation.label) {
			label = {
				display:         true,
					backgroundColor: lineAnnotation.label.backgroundColor,
					position:        'start',
					content:         lineAnnotation.label.text,
					font: {
					color: lineAnnotation.label.fontColor,
						style: lineAnnotation.label.fontStyle,
				},
			};
		}

		this._annotations.push({
			...annotations,
			label,
		});
	}

	private getColorNumber(i: number): number {
		let colorNumber = i;
		if (colorNumber > (this.defaultColors.length - 1)) {
			colorNumber = 0;
		}
		return colorNumber;
	}

	private addBoxAnnotation(boxAnnotation: ChartBoxAnnotation, defaultBorderColor: any) {

		if (!boxAnnotation.borderColor) {
			boxAnnotation.borderColor = defaultBorderColor;
		}

		if (!boxAnnotation.borderWidth) {
			boxAnnotation.borderWidth = 2;
		}

		if (!boxAnnotation.backgroundColor) {
			boxAnnotation.backgroundColor = 'transparent';
		}

		this._annotations.push({
			drawTime:        boxAnnotation.drawTime,
			id:              'annotation' + (this._annotations.length + 1),
			type:            boxAnnotation.type,
			backgroundColor: boxAnnotation.backgroundColor,
			borderWidth:     boxAnnotation.borderWidth,
			borderColor:     boxAnnotation.borderColor,
			xMin:            boxAnnotation.xMin,
			xMax:            boxAnnotation.xMax,
			yMin:            boxAnnotation.yMin,
			yMax:            boxAnnotation.yMax,
			xScaleID:        'x',
			yScaleID:        boxAnnotation.scaleId
		});

	}

	private setAxisVisibility(): void {
		/* Axes Labels */
		this.axesVisible = !(this.type === 'pie' || this.type === 'doughnut' || this.type === 'polarArea' || this.type === 'radar');
		this.xAxisLabelVisible = !!this.xLabelAxis;
		this.yAxisLabelVisible = !!this.yLabelAxis;
	}

	private legendClickCallback(event) {
		event = event || window.event;
		let target = event.target || event.srcElement;
		while (target.nodeName !== 'LI') {
			target = target.parentElement;
		}
		const parent = target.parentElement;
		const chart: any = this.chart;
		const index = Array.prototype.slice.call(parent.children)
			.indexOf(target);

		this.chart.data.datasets[index].hidden = !this.chart.data.datasets[index].hidden;
		if (chart) {
			if (chart.isDatasetVisible(index)) {
				target.classList.remove('hidden');
			} else {
				target.classList.add('hidden');
			}
			chart.update();
		}
	}
}

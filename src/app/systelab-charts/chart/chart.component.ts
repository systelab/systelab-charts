import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import 'chartjs-plugin-annotation';
import { SafeHtml, DomSanitizer } from '../../../../node_modules/@angular/platform-browser';

export class ChartItem {
	constructor(public label: string, public data: Array<any>, public borderColor?: string, public backgroundColor?: string,
		public fill?: boolean, public showLine?: boolean, public isGradient?: boolean, public borderWidth?: number, public chartType?: string,
		public chartTooltipItem?: ChartTooltipItem) {
	}
}

export class Annotation {
	constructor(public drawTime: string, public type: string, public borderColor?: string, public borderWidth?: number) {

	}
}

export class ChartLineAnnotation extends Annotation {
	constructor(public label: ChartLabelAnnotation, public value: number, public orientation: string, drawTime: string,
		type: string, public borderDash?: Array<number>, borderColor?: string, borderWidth?: number, public endValue?: number) {
		super(drawTime, type, borderColor, borderWidth);
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
	constructor(public title?: string, public label?: string, public afterLabel?: string, public valueInAfterLabel?: boolean) {
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

export class ChartRangeIndicatorSettings {
	constructor(public minValue: number, public maxValue: number, public intervalSize: number, public value: number, public borders?: boolean, public colors?: Array<string>, public colorIndicator?: string,
		public borderColor?: string, public fontSize?: number, public fontColor?: string, public height?: number) {
	}
}

@Component({
	selector: 'systelab-chart',
	templateUrl: './chart.component.html'
})
export class ChartComponent implements AfterViewInit {
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
	chart = Chart;
	public svg: SafeHtml;
	private _itemSelected: any;

	@Input()
	get itemSelected(): any {
		return this._itemSelected;
	}

	@Output() itemSelectedChange = new EventEmitter();

	set itemSelected(value: any) {
		this._itemSelected = value;
		this.itemSelectedChange.emit(this._itemSelected);
	}

	@Input() labels: Array<any> = [];
	@Input() data: Array<ChartItem> = [];
	@Input() annotations: Array<ChartLineAnnotation | ChartBoxAnnotation> = [];
	@Input() showLegend = true;
	@Input() isHorizontal = false;
	@Input() yMinValue: any;
	@Input() yMaxValue: any;
	@Input() xMinValue: any;
	@Input() xMaxValue: any;
	@Input() yLabelAxis: string;
	@Input() xLabelAxis: string;
	@Input() lineTension: number;
	@Input() isBackgroundGrid = true;
	@Input() type: string;
	@Input() responsive = true;
	@Input() maintainAspectRatio = true;
	@Input() tooltipSettings: ChartTooltipSettings;
	@Input() rangeIndicatorSettings: ChartRangeIndicatorSettings;

	@Input() minValueForRadar: number;
	@Input() maxValueForRadar: number;

	private dataset: Array<any> = [];

	private _annotations: Array<any> = [];
	private axesVisible = true;
	private yAxisLabelVisible = false;
	private xAxisLabelVisible = false;

	@Output() action = new EventEmitter();

	@ViewChild('canvas') canvas: ElementRef;

	constructor(private sanitizer: DomSanitizer) { }

	public ngAfterViewInit() {

		let cx: CanvasRenderingContext2D;

		if (this.type === 'bar') {
			if (this.isHorizontal) {
				this.type = 'horizontalBar';
			}
		}

		if (!this.tooltipSettings) {
			this.tooltipSettings = new ChartTooltipSettings();
		}

		/* Axes Labels */
		if (this.xLabelAxis) {
			this.xAxisLabelVisible = true;
		}
		if (this.yLabelAxis) {
			this.yAxisLabelVisible = true;
		}
		if (this.type === 'rangeIndicator') {
			this.drawRangeIndicatorChart();
		}
		else {
			if (this.canvas.nativeElement) {
				cx = this.canvas.nativeElement.getContext('2d');
			}

			this.setData(cx);

			if (this.type === 'pie' || this.type === 'doughnut' || this.type === 'polarArea' || this.type === 'radar') {
				this.axesVisible = false;
			}
			this.addAnnotations();
			this.drawChart(cx);
		}
	}

	private drawChart(cx: CanvasRenderingContext2D) {
		/* Draw the chart */
		if (this.canvas.nativeElement) {
			const definition: any = {
				type: this.type,
				data: {
					labels: this.labels,
					datasets: this.dataset
				},

				options: {
					responsive: this.responsive,
					maintainAspectRatio: this.maintainAspectRatio,
					onClick: (evt, item) => {
						const e = item[0];
						if (e) {
							this.itemSelected = e;
							this.action.emit();
						}
					},
					elements: {
						line: {
							tension: this.lineTension
						}
					},
					display: true,
					legend: {
						display: this.showLegend
					},
					scales: {
						yAxes: [{
							ticks: {
								min: this.yMinValue,
								max: this.yMaxValue,
								display: this.axesVisible
							},
							gridLines: {
								display: this.isBackgroundGrid,
								drawBorder: this.axesVisible
							},
							scaleLabel: {
								display: this.yAxisLabelVisible,
								labelString: this.yLabelAxis
							}
						}],
						xAxes: [{
							ticks: {
								min: this.xMinValue,
								max: this.xMaxValue,
								display: this.axesVisible
							},
							gridLines: {
								display: this.isBackgroundGrid,
								drawBorder: this.axesVisible
							},
							scaleLabel: {
								display: this.xAxisLabelVisible,
								labelString: this.xLabelAxis
							}
						}]
					},
					annotation: {
						events: ['click'],
						annotations: this._annotations
					},
					tooltips: {
						callbacks: {
							title: function (tooltipItem, data) {
								const item = data.datasets[tooltipItem[0].datasetIndex];
								if (item.chartTooltipItem) {
									if (item.chartTooltipItem.title) {
										return item.chartTooltipItem.title;
									}
								}
							},
							label: function (tooltipItem, data) {
								const item = data.datasets[tooltipItem.datasetIndex];
								let label = data.datasets[tooltipItem.datasetIndex].label;
								if (!label) {
									label = data.labels[tooltipItem.index];
								}
								const val = item.data[tooltipItem.index];
								let rt = '';
								if (val instanceof Object) {
									if (val.t) {
										rt = val.t;
									} else {
										rt = '(' + val.x + ',' + val.y + ')';
									}
								} else {
									rt = val;
								}
								if (item.chartTooltipItem) {
									if (item.chartTooltipItem.label) {
										label = item.chartTooltipItem.label;
									}
									if (!item.chartTooltipItem.valueInAfterLabel) {
										label += ': ' + rt;
									}
								} else {
									label += ': ' + rt;
								}
								return label;
							},
							afterLabel: function (tooltipItem, data) {
								const item = data.datasets[tooltipItem.datasetIndex];
								let afterLabel = '';
								if (item.chartTooltipItem) {
									if (item.chartTooltipItem.afterLabel) {
										afterLabel = item.chartTooltipItem.afterLabel;
									}
									if (item.chartTooltipItem.valueInAfterLabel) {
										const val = item.data[tooltipItem.index];
										let rt = '';
										if (val instanceof Object) {
											if (val.t) {
												rt = val.t;
											} else {
												rt = '(' + val.x + ',' + val.y + ')';
											}
										} else {
											rt = val;
										}
										afterLabel += ' (' + rt + ')';
									}
								}
								return afterLabel;
							}
						},
						backgroundColor: this.tooltipSettings.backgroundColor,
						titleFontSize: this.tooltipSettings.titleFontSize,
						titleFontColor: this.tooltipSettings.titleFontColor,
						bodyFontColor: this.tooltipSettings.bodyFontColor,
						bodyFontSize: this.tooltipSettings.bodyFontSize,
						borderColor: this.tooltipSettings.borderColor,
						borderWidth: this.tooltipSettings.borderWidth
					}
				}
			};

			if (this.type === 'radar') {
				definition.options.scale = {
					ticks: {
						min: this.minValueForRadar,
						max: this.maxValueForRadar
					}
				};
			}

			this.chart = new Chart(cx, definition);
		}
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
						borderColorList.push(this.rgba(this.defaultColors[colorNumber], 1));
						backgroundColorList.push(this.rgba(this.defaultColors[colorNumber], 1));
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
					label: this.data[i].label, data: this.data[i].data, borderColor: borderColors,
					backgroundColor: backgroundColors, fill: this.data[i].fill,
					type: this.data[i].chartType, borderWidth: this.data[i].borderWidth, showLine: this.data[i].showLine,
					chartTooltipItem: this.data[i].chartTooltipItem
				});
			}
		}

	}

	private addAnnotations() {
		if (this.annotations) {
			for (let i = 0; i < this.annotations.length; i++) {
				if (this.annotations[i] instanceof ChartLineAnnotation) {
					this.addLineAnnotation(<ChartLineAnnotation>this.annotations[i], this.rgba(this.defaultColors[this.getColorNumber(i)], 1), this.rgba(this.defaultColors[this.getColorNumber(i) + 1], 1));
				}
				if (this.annotations[i] instanceof ChartBoxAnnotation) {
					this.addBoxAnnotation(<ChartBoxAnnotation>this.annotations[i], this.rgba(this.defaultColors[this.getColorNumber(i)], 1));

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
		let scaleId = 'y-axis-0';
		if (lineAnnotation.orientation === 'vertical') {
			scaleId = 'x-axis-0';
		}
		this._annotations.push({
			drawTime: lineAnnotation.drawTime, id: 'annotation' + (this._annotations.length + 1), type: lineAnnotation.type,
			mode: lineAnnotation.orientation, scaleID: scaleId, value: lineAnnotation.value,
			borderColor: lineAnnotation.borderColor, endValue: lineAnnotation.endValue,
			label: {
				backgroundColor: lineAnnotation.label.backgroundColor,
				position: lineAnnotation.label.position,
				content: lineAnnotation.label.text,
				fontColor: lineAnnotation.label.fontColor,
				enabled: true,
				fontStyle: lineAnnotation.label.fontStyle
			}, borderWidth: lineAnnotation.borderWidth, borderDash: lineAnnotation.borderDash
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
			drawTime: boxAnnotation.drawTime,
			id: 'annotation' + (this._annotations.length + 1),
			type: boxAnnotation.type,
			backgroundColor: boxAnnotation.backgroundColor,
			borderWidth: boxAnnotation.borderWidth,
			borderColor: boxAnnotation.borderColor,
			xMin: boxAnnotation.xMin,
			xMax: boxAnnotation.xMax,
			yMin: boxAnnotation.yMin,
			yMax: boxAnnotation.yMax,
			xScaleID: 'x-axis-0',
			yScaleID: 'y-axis-0'
		});

	}

	public rgba(colour: Array<number>, alpha: number): string {
		return 'rgba(' + colour.concat(alpha)
			.join(',') + ')';
	}

	public doUpdate() {
		let cx: CanvasRenderingContext2D;
		if (this.canvas.nativeElement) {
			cx = this.canvas.nativeElement.getContext('2d');
		}
		this.chart.destroy();
		this.dataset = [];
		this.setData(cx);
		this.addAnnotations();
		this.drawChart(cx);
	}

	private getXPosition(value: number): number {
		if (value < 10) {
			return 3;
		}
		else if (value < 100) {
			return 7;
		}
		else {
			return 10;
		}
	}
	private drawRangeIndicatorChart() {
		if (this.rangeIndicatorSettings) {
			let height = 50;
			let paddingLeft = 25;
			let value = 0;
			let totalNegative = 0;
			let totalPositive = 0;
			let totalWidthNegative = 0;
			let totalWidthPositive = 0;
			let countGap = 0;
			let valueLabel = 0;

			if (this.rangeIndicatorSettings.height) {
				height = this.rangeIndicatorSettings.height;
				paddingLeft = height / 2;
			}
			let content = this.openSvg(height + 30);

			let totalWidth = paddingLeft;

			let fontSize = 12;
			if (this.rangeIndicatorSettings.fontSize) {
				fontSize = this.rangeIndicatorSettings.fontSize;
			}
			let fontColor = '#808182';
			if (this.rangeIndicatorSettings.fontColor) {
				fontColor = this.rangeIndicatorSettings.fontColor;
			}

			let fillIndicator = this.rgba(this.defaultColors[0], 1);
			if (this.rangeIndicatorSettings.colorIndicator) {
				fillIndicator = this.rangeIndicatorSettings.colorIndicator;
			}

			if (this.rangeIndicatorSettings.value) {
				value = this.rangeIndicatorSettings.value;
			}

			if (this.rangeIndicatorSettings.minValue < 0) {
				countGap = (this.rangeIndicatorSettings.maxValue + ((-1) * this.rangeIndicatorSettings.minValue)) / this.rangeIndicatorSettings.intervalSize;
			}
			else {
				countGap = (this.rangeIndicatorSettings.maxValue - this.rangeIndicatorSettings.minValue) / this.rangeIndicatorSettings.intervalSize;
			}

			for (let i = 1; i <= countGap; i++) {
				let value = 0;
				if (i == 1) {
					valueLabel = this.rangeIndicatorSettings.minValue;
				}
				else {
					valueLabel = valueLabel + this.rangeIndicatorSettings.intervalSize;
				}

				if (valueLabel < 0) {
					value = valueLabel * (-1);
					totalNegative += value;
					totalWidthNegative = totalWidth + height;
				}
				else {
					totalPositive += value;
					totalWidthPositive = totalWidth + height;
				}

				let fill = this.rgba(this.defaultColors[i + 1], 1);
				if (this.rangeIndicatorSettings.colors) {
					if (this.rangeIndicatorSettings.colors[i - 1]) {
						fill = this.rangeIndicatorSettings.colors[i - 1];
					}
				}

				let border = 'none';
				if (this.rangeIndicatorSettings.borders === true) {
					if (this.rangeIndicatorSettings.borderColor) {
						border = this.rangeIndicatorSettings.borderColor;
					}
				}

				let xLabel = totalWidth - this.getXPosition(value);
				content += this.addText(content, xLabel, (height + 15), fontColor, fontSize, valueLabel);
				content += this.addRectangle(content,height,height,totalWidth,fill,border);
				totalWidth = totalWidth + height;
			}

			let lastValue = this.rangeIndicatorSettings.maxValue;
			if (lastValue < 0) {
				lastValue = lastValue * (-1);
				totalNegative += lastValue;
			}
			else {
				totalPositive += lastValue;
			}
			content = this.addText(content, (totalWidth - this.getXPosition(lastValue)), (height + 15), fontColor, fontSize, this.rangeIndicatorSettings.maxValue);

			let point3 = 0;
			if (totalNegative > 0) {
				if (value < 0) {
					point3 = Math.round(((totalNegative + value) * ((totalWidthNegative + paddingLeft))) / totalNegative) - paddingLeft;
				}
				else {
					if (value === 0) {
						point3 = totalWidthNegative;
					}
					else {
						point3 = Math.round((value * ((totalWidthPositive - totalWidthNegative))) / totalPositive) + totalWidthNegative;
					}
				}
			}
			else {
				if (value === 0) {
					point3 = paddingLeft;
				}
				else {
					point3 = Math.round((value * (totalWidth - paddingLeft)) / lastValue) + paddingLeft;
				}
			}

			const point1 = point3 - (height / 2);
			const point2 = point3 + (height / 2);
			content = this.addPolygon(content, point1, point2, point3, height, fillIndicator, this.rangeIndicatorSettings.value);

			this.svg = this.closeSvg(content);
		}
	}
	private addRectangle(content: string, width: number, height: number, x: number, fill: string, border: string): string {
		content += ' <rect width="' + width + '" height="' + height + '" x="' + x + '" style="fill:' + fill + ';stroke:' + border + '" />';
		return content;
	}
	private addPolygon(content: string, p1: number, p2: number, p3: number, height: number, fill: string, value: number): string {
		content += '<polygon  points="' + p1 + ',0 ' + p2 + ',0 ' + p3 + ',' + height + '" style="fill:' + fill + ';stroke:none;stroke-width:0;cursor:pointer">';
		content += '       <title>' + value + '</title>';
		content += '</polygon>';
		return content;
	}
	private addText(content: string, x: number, y: number, fontColor: string, fontSize: number, value: number): string {
		content += '<text x="' + x + '" y="' + y + '" fill="' + fontColor + '" style="font-size:' + fontSize + 'px;">' + value + '</text>';
		return content;
	}
	private openSvg(height: number): string {
		let content = '<svg class="w-100" style="height:' + (height + 30) + 'px">';
		content += '<g>';
		return content;
	}
	private closeSvg(content: string): SafeHtml {
		content += ' </g>';
		content += ' </svg>';
		return this.sanitizer.bypassSecurityTrustHtml(content);
	}
}

export const ChartMeterData = class {

	constructor(dataArray, chartMeterOptions) {
		this.textBackgroundColor = getTextBackgroundColor(chartMeterOptions.levels, dataArray[dataArray.length - 1]);
		this.visualMinValue = chartMeterOptions.minVisualValue;
		this.visualMaxValue = chartMeterOptions.maxVisualValue;
		this.levelMinValue = Math.min(...chartMeterOptions.levels.map(value => value.minValue));
		this.levelMaxValue = Math.max(...chartMeterOptions.levels.map(value => value.maxValue));
		this.dataValue = dataArray[dataArray.length - 1];

		this.minValue = this.visualMinValue != null ? Math.min(this.visualMinValue, this.levelMinValue) : this.levelMinValue;
		this.maxValue = this.visualMaxValue != null ? Math.max(this.visualMaxValue, this.levelMaxValue) : this.levelMaxValue;

		while (this.dataValue <= this.minValue) {
			this.minValue -= Math.abs(this.dataValue * 0.8);
		}
		while (this.dataValue >= this.maxValue) {
			this.maxValue += Math.abs(this.dataValue * 0.8);
		}

		if (chartMeterOptions.unitFormat && chartMeterOptions.unitFormat.lastIndexOf('.') > 0) {
			this.fractionDigits = chartMeterOptions.unitFormat.substr(chartMeterOptions.unitFormat.indexOf('.') + 1).length;
		} else {
			this.fractionDigits = (this.maxValue - this.minValue) <= 20 ? 1 : 0;
		}
		this.text = dataArray.length > 0 ? dataArray[dataArray.length - 1].toFixed(this.fractionDigits) : '--';
		this.textIncrement = Math.abs((this.maxValue - this.minValue)) / 61;
	}

};

export const getRegionYPos = (yAxisLabelItem, level) => {

	const label = yAxisLabelItem.filter(value => Number(value.label) === level);

	if (label.length > 0) {
		return label[0].y;
	} else {
		const lowerLimit = yAxisLabelItem.filter(value => Number(value.label) < level)[0];
		const higherLimit = yAxisLabelItem.filter(value => Number(value.label) > level)
			.slice(-1)[0];

		if (!lowerLimit) {
			return yAxisLabelItem.slice(-1)[0].y;
		}
		if (!higherLimit) {
			return yAxisLabelItem[0].y;
		}
		return range(Number(higherLimit.label), Number(lowerLimit.label), higherLimit.y, lowerLimit.y, Number(level));
	}
};

export const drawRegions = (chart) => {
	const yAxisLabelItems = chart.boxes.filter(value => value.id === 'y-axis-0')[0]._labelItems;
	chart.options.chartMeterOptions.levels.forEach(level => {
		const minLevelY = getRegionYPos(yAxisLabelItems, level.minValue);
		const maxLevelY = getRegionYPos(yAxisLabelItems, level.maxValue);
		const context = chart.chart.ctx;
		let heightToPrint = minLevelY - maxLevelY;
		let yPos = minLevelY - heightToPrint;
		if (minLevelY - heightToPrint < chart.chartArea.top) {
			yPos = chart.chartArea.top;
			heightToPrint = minLevelY - chart.chartArea.top;
		}
		context.beginPath();
		context.fillStyle = level.levelColor;
		context.fillRect(chart.chartArea.left + 1, yPos, chart.chartArea.right - 25, heightToPrint);
		context.fillStyle = '#FFFFFFAA';
		context.fillRect(chart.chartArea.left + 1, yPos, chart.chartArea.right - 25, heightToPrint);
		context.closePath();
	});
};

export const drawTextPanel = (context, text, backgroundColor, xPos, yPos, rectWidth, rectHeight, textColor, frameColor) => {
	context.font = getFontSized(54, rectHeight, 'digital-font');
	context.lineJoin = "round";
	const textWidth = text ? context.measureText(text).width + 20 : 0;
	rectWidth = Math.max(rectWidth, getFrameSize(context.canvas.width), textWidth);
	let frameColorHeight = 0;
	if (frameColor) {
		frameColorHeight = 4;
		// Set rectangle and corner values
		context.fillStyle = backgroundColor;
		context.lineWidth = 12;

		// Change origin and dimensions to match true size (a stroke makes the shape a bit larger)
		context.beginPath();
		context.strokeStyle = frameColor;
		context.strokeRect(xPos, yPos, rectWidth, rectHeight);
		context.closePath();
	}

	context.beginPath();
	context.lineWidth = 3;
	context.fillStyle = backgroundColor;
	context.fillRect(xPos + 4, yPos + frameColorHeight, rectWidth - 8, rectHeight - frameColorHeight * 2);
	context.strokeStyle = 'darkgray';
	context.strokeRect(xPos + 4, yPos + frameColorHeight, rectWidth - 8, rectHeight - frameColorHeight * 2);
	context.closePath();
	if (text) {
		context.fillStyle = textColor;
		context.fillText(text, (xPos + rectWidth) - context.measureText(text).width - 10, yPos + rectHeight - context.measureText(text).actualBoundingBoxAscent / 5);
	}
};

export const getFrameSize = (canvasWidth) => {
	const baseWidth = 936;                   // selected default width for canvas
	const baseFrameSize = 15;                     // default size for font

	const ratio = baseFrameSize / baseWidth;   // calc ratio
	return canvasWidth * ratio;   // get font size based on current width
};

export const getFontSized = (defaultFontSize, availableHeight, fontFamily) => {
	const fontBase = 60;                   // selected default available height

	const ratio = defaultFontSize / fontBase;   // calc ratio
	const size = availableHeight * ratio;   // get font size based on current width
	return size.toFixed(0) + 'px ' + fontFamily; // set font
};

export const getRadius = (radius) => {
	return 0.22 * radius;
};

export const applyFractionDigits = (number, fractionDigits) => {
	return Number(number)
		.toFixed(fractionDigits);
}

export const getTextBackgroundColor = (levels, currentValue) => {

	const level = levels.filter(value => value.minValue <= currentValue && currentValue <= value.maxValue);

	if (level.length > 0) {
		return level[0].levelColor;
	}
	return '#95D9FF';
};

export const getTextColor = (color) => {
	const c = color.substring(1);      // strip #
	const rgb = parseInt(c, 16);   // convert rrggbb to decimal
	const r = (rgb >> 16) & 0xff;  // extract red
	const g = (rgb >> 8) & 0xff;  // extract green
	const b = (rgb >> 0) & 0xff;  // extract blue

	const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

	if (luma < 55) {
		return '#FFF';
	}
	return '#174967';
};

export const hideGoalsAndTooltips = (chart) => {
	if (chart.options.chartMeterOptions.showHistory) {
		chart.data.datasets[0].hidden = chart.data.datasets.length <= 1;
	} else {
		chart.options.tooltips.enabled = false;
		chart.data.datasets[0].hidden = chart.data.datasets.length > 1;
	}
};

const lerp = (x, y, a) => x * (1 - a) + y * a;
const clamp = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a));
const invlerp = (x, y, a) => clamp((a - x) / (y - x));
export const range = (x1, y1, x2, y2, a) => lerp(x2, y2, invlerp(x1, y1, a));

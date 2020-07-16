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

		const middleNumber = (Number(higherLimit.label) - Number(lowerLimit.label)) / 2;
		const difference = (lowerLimit.y - higherLimit.y) / 2;

		return (higherLimit.y + difference) * level / (Number(higherLimit.label) - middleNumber);
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
		context.fillStyle = level.periodColor;
		context.fillRect(chart.chartArea.left + 1, yPos, chart.chartArea.right - 25, heightToPrint);
		context.fillStyle = '#FFFFFFAA';
		context.fillRect(chart.chartArea.left + 1, yPos, chart.chartArea.right - 25, heightToPrint);
		context.closePath();
	});
};

export const drawTextPanel = (context, text, backgroundColor, xPos, yPos, width, height, frameColor) => {

	const frameSize = getFrameSize(context.canvas.width);
	if (frameColor) {
		context.beginPath();
		context.lineWidth = frameSize;
		context.strokeStyle = frameColor;
		context.strokeRect(xPos - frameSize / 2, yPos - frameSize / 2, width + frameSize, height + frameSize);
		context.closePath();
	}

	context.lineJoin = 'round';
	context.beginPath();
	context.lineWidth = 3;
	context.fillStyle = backgroundColor;
	context.fillRect(xPos, yPos, width, height);
	context.strokeStyle = 'darkgray';
	context.strokeRect(xPos, yPos, width, height);
	context.closePath();

	context.font = getFontSized(54, height, 'digital-font');
	context.fillStyle = '#174967';

	context.fillText(text, (xPos + width) - context.measureText(text).width - 5, yPos + height - frameSize / 2);
};

export const getBoxSize = (canvasWidth) => {
	const baseWidth = 936;                   // selected default width for canvas
	const baseBoxSize = 40;                     // default size for font

	const ratio = baseBoxSize / baseWidth;   // calc ratio
	return canvasWidth * ratio;   // get font size based on current width
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
}

export const getTextBackgroundColor = (levels, currentValue) => {

	const level = levels.filter(value => value.minValue <= currentValue && currentValue <= value.maxValue);

	if (level.length > 0) {
		return level[0].periodColor;
	}
	return '#95D9FF';
}

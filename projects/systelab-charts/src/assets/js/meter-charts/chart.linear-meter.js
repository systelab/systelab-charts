import {
	drawTextPanel,
	getFontSized,
	getTextBackgroundColor,
	getTextColor,
	ChartMeterData,
	range,
	getRectWidthBasedOnText,
	hideGoalsAndTooltips,
	drawRoundedRect,
	getScaledWidthOrHeightValue,
	getResponsiveWidthBasedOnAvailableCanvasHeight,
	quartile_25,
	quartile_75,
	median
} from "./chart.common-meter-functions";
import {DecimalFormat} from "../decimalFormat";

export const LinearMeter = Chart.controllers.bar.extend({
	buildOrUpdateElements:        function() {
		Chart.controllers.bar.prototype.buildOrUpdateElements.apply(this, arguments);
		hideGoalsAndTooltips(this.chart);
	},
	draw:                         function(ease) {
		// Call super method first
		if (this.chart.options.chartMeterOptions.showHistory) {
			Chart.controllers.bar.prototype.draw.apply(this, arguments);
		} else {
			const context = this.chart.chart.ctx;
			const canvas = this.chart.canvas;

			context.save();
			context.clearRect(0, 0, canvas.width, canvas.height);
			const centerX = canvas.width / 2;
			const centerY = canvas.height / 2;
			const roundRectBorderRadius = 12;

			const chartMeterData = new ChartMeterData(this._data, this.chart.options.chartMeterOptions);
			context.moveTo(centerX, centerY);

			if (this.chart.options.isHorizontal) {

				const externalPanelWidth = getResponsiveWidthBasedOnAvailableCanvasHeight(canvas.height, centerY - (centerY / 3), 500,
					Math.max(500, centerX + centerX / 2), 660, 180);
				const externalPanelHeight = getScaledWidthOrHeightValue(externalPanelWidth, 660, 180);

				const textPanelWidth = getScaledWidthOrHeightValue(externalPanelWidth, 200, 45);
				const textPanelHeight = getScaledWidthOrHeightValue(textPanelWidth, 120, 30);

				const textPanelYPos = centerY - (externalPanelHeight / 2) + 15;
				const increment = Math.max(7, externalPanelWidth / 65);
				const ticksLabelsXStartPos = centerX - (externalPanelWidth / 2) + increment * 2.5;

				const linearGradient = context?.createLinearGradient(centerX - (externalPanelWidth / 2), centerY - (externalPanelHeight / 2), centerX - (externalPanelWidth / 2), centerY + (externalPanelHeight / 2));
				linearGradient.addColorStop(0, '#d3d3d3');
				linearGradient.addColorStop(0.20, '#ffffff');
				linearGradient.addColorStop(0.80, '#ffffff');
				linearGradient.addColorStop(1, '#d3d3d3');

				context.fillStyle = linearGradient;
				context.fillRect(centerX - (externalPanelWidth / 2), centerY - (externalPanelHeight / 2), externalPanelWidth, externalPanelHeight);

				drawRoundedRect(context, centerX - (externalPanelWidth / 2), centerY - (externalPanelHeight / 2), externalPanelWidth, externalPanelHeight, roundRectBorderRadius, 10,
					this.chart.options.chartMeterOptions.borderColor);

				this.drawHorizontalTicksLabelsBar(context, this._data[this._data.length - 1], ticksLabelsXStartPos,
					textPanelYPos + textPanelHeight + textPanelHeight / 2, externalPanelHeight,
					increment, chartMeterData.minValue, chartMeterData.maxValue, chartMeterData.textIncrement, chartMeterData.numberFormat, chartMeterData.fractionDigits);

				drawTextPanel(context, chartMeterData.text, chartMeterData.textBackgroundColor, (ticksLabelsXStartPos + increment * 60) - textPanelWidth, textPanelYPos,
					textPanelWidth, textPanelHeight, getTextColor(chartMeterData.textBackgroundColor)
				);

			} else { // Vertical
				const textPanelHeight = Math.max(30, centerY / 8);
				let textPanelWidth = Math.max(98, centerX / 4);

				const externalPanelHeight = Math.max(365, canvas.height * 0.9);
				const externalPanelWidth = Math.max(130, centerX / 3, getRectWidthBasedOnText(context, textPanelWidth, textPanelHeight, chartMeterData.text) * 1.45);

				const calculatedYPos = Math.max(333, externalPanelHeight - textPanelHeight - 20);

				const linearGradient = context?.createLinearGradient(centerX - centerX / 6, 15, (centerX - centerX / 6) + externalPanelWidth, 15);
				linearGradient.addColorStop(0, '#d3d3d3');
				linearGradient.addColorStop(0.20, '#ffffff');
				linearGradient.addColorStop(0.80, '#ffffff');
				linearGradient.addColorStop(1, '#d3d3d3');

				context.fillStyle = linearGradient;
				context.fillRect(centerX - centerX / 6, 15, externalPanelWidth, externalPanelHeight);

				drawRoundedRect(context, centerX - centerX / 6, 15, externalPanelWidth,
					externalPanelHeight, roundRectBorderRadius, 10, this.chart.options.chartMeterOptions.borderColor);

				drawTextPanel(context, chartMeterData.text, chartMeterData.textBackgroundColor, (centerX - centerX / 6) + 10,
					calculatedYPos + 15, externalPanelWidth - 20, textPanelHeight, getTextColor(chartMeterData.textBackgroundColor));

				const increment = externalPanelHeight * 6.75 / 495;
				const panelsSeparation = 15 * textPanelHeight / 30;
				const originalCanvasDir = canvas.dir;
				canvas.dir = 'rtl';
				this.drawVerticalTicksLabelsBar(context, this._data[this._data.length - 1], centerX - centerX / 6 + 3,
					externalPanelHeight - textPanelHeight - panelsSeparation, textPanelWidth,
					increment, chartMeterData.minValue, chartMeterData.maxValue, chartMeterData.textIncrement, chartMeterData.numberFormat, chartMeterData.fractionDigits);
				canvas.dir = originalCanvasDir;
			}
			context.restore();

		}
	},
	drawHorizontalTicksLabelsBar: function(context, valueToPrint, xStartPos, yStartPos, panelHeight, increment, minValue, maxValue, textIncrement, numberFormat, fractionDigits) {
		context.beginPath();
		context.strokeStyle = '#000000';
		context.fillStyle = '#000000';
		const calculatedHeightForPanels = Math.max(35, panelHeight / 3.5);
		const calculatedYPos = yStartPos + calculatedHeightForPanels + 20;
		context.font = getFontSized(14, calculatedHeightForPanels, 'Helvetica');
		const textGap = 25 * calculatedHeightForPanels / 70;
		let valueToPrintXPos;

		for (let index = 0; index <= 60; index++) {
			let textValue = this.getTextValue(minValue + index * textIncrement, numberFormat, fractionDigits);
			textValue = this.getTextValueForLimits(index, textValue, minValue, maxValue, numberFormat);
			if (Number(textValue) === valueToPrint) {
				valueToPrintXPos = xStartPos + index * increment;
			}
			switch (index % 10) {
				case 0:
					context.lineWidth = 2;
					context.fillText(textValue, xStartPos + index * increment - context.measureText(textValue).width / 2, calculatedYPos + textGap);
					context.beginPath();
					context.moveTo(xStartPos + index * increment, calculatedYPos - 10);
					context.lineTo(xStartPos + index * increment, calculatedYPos);
					context.stroke();
					context.closePath();
					break;
				case 5:
					context.lineWidth = 2;
					context.beginPath();
					context.moveTo(xStartPos + index * increment, calculatedYPos - 8);
					context.lineTo(xStartPos + index * increment, calculatedYPos);
					context.stroke();
					context.closePath();
					break;
				default:
					context.lineWidth = 1;
					context.beginPath();
					context.moveTo(xStartPos + index * increment, calculatedYPos - 5);
					context.lineTo(xStartPos + index * increment, calculatedYPos);
					context.stroke();
					context.closePath();
					break;
			}
		}

		drawTextPanel(context, undefined, '#ffffff', xStartPos - 5, yStartPos, increment * 61, calculatedHeightForPanels);

		const firstValue = Number(this.getTextValue(minValue, numberFormat, fractionDigits));
		const lastValue = Number(this.getTextValue(maxValue, numberFormat, fractionDigits));
		const lastValueXPosition = xStartPos + 60 * increment;
		if (!valueToPrintXPos) {
			valueToPrintXPos = range(firstValue, lastValue, xStartPos, lastValueXPosition, valueToPrint);
		}
		if (valueToPrint > minValue) {
			context.beginPath();
			context.lineWidth = 2;
			context.fillStyle = getTextBackgroundColor(this.chart.options.chartMeterOptions.levels, valueToPrint);
			context.fillRect(xStartPos, yStartPos + 1, (valueToPrint > maxValue ? lastValueXPosition : valueToPrintXPos) - xStartPos - 1, calculatedHeightForPanels - 2);
			context.closePath();
		}
	},
	drawVerticalTicksLabelsBar:   function(context, valueToPrint, xStartPos, yStartPos, panelWidth, increment, minValue, maxValue, textIncrement, numberFormat, fractionDigits) {
		context.beginPath();
		context.strokeStyle = '#000000';
		context.font = getFontSized(12, panelWidth / 2, 'Helvetica');
		context.fillStyle = '#000000';
		const calculatedYPos = Math.max(333, yStartPos);

		let valueToPrintYPos;
		let maxTextLabelWidth = 0;

		for (let index = 0; index <= 60; index++) {
			if (index % 10 === 0) {
				const textValue = this.getTextValue(minValue + index * textIncrement, numberFormat, fractionDigits);
				maxTextLabelWidth = Math.max(maxTextLabelWidth, context.measureText(textValue).width * 1.525);
			}
		}

		for (let index = 0; index <= 60; index++) {
			let textValue = this.getTextValue(minValue + index * textIncrement, numberFormat, fractionDigits);
			textValue = this.getTextValueForLimits(index, textValue, minValue, maxValue, numberFormat);
			if (Number(textValue) === valueToPrint) {
				valueToPrintYPos = calculatedYPos - index * increment;
			}
			switch (index % 10) {
				case 0:
					let actualBoundingBoxAscent = context.measureText(textValue).actualBoundingBoxAscent / 2;
					if (Number.isNaN(actualBoundingBoxAscent)) {
						actualBoundingBoxAscent = panelWidth * 4 / 114.625;
					}
					if (textValue.includes('-')) {
						textValue = textValue.replace('-', '') + '-';
					}
					context.lineWidth = 2.5;
					context.fillText(textValue, xStartPos + maxTextLabelWidth - 8, calculatedYPos - index * increment + actualBoundingBoxAscent);
					context.beginPath();
					context.moveTo(xStartPos + 10 + maxTextLabelWidth, calculatedYPos - index * increment);
					context.lineTo(xStartPos + maxTextLabelWidth, calculatedYPos - index * increment);
					context.stroke();
					context.closePath();
					break;
				case 5:
					context.lineWidth = 1.5;
					context.beginPath();
					context.moveTo(xStartPos + 8 + maxTextLabelWidth, calculatedYPos - index * increment);
					context.lineTo(xStartPos + maxTextLabelWidth, calculatedYPos - index * increment);
					context.stroke();
					context.closePath();
					break;
				default:
					context.lineWidth = 0.7;
					context.beginPath();
					context.moveTo(xStartPos + 5 + maxTextLabelWidth, calculatedYPos - index * increment);
					context.lineTo(xStartPos + maxTextLabelWidth, calculatedYPos - index * increment);
					context.stroke();
					context.closePath();
					break;
			}
		}
		const linearGradient = context.createLinearGradient(0, 100, 0, 50);

		linearGradient.addColorStop(0.5, '#d3d3d3');
		linearGradient.addColorStop(1, '#808080');

		const calculatedBarWidth = panelWidth * 0.6 - fractionDigits;
		drawTextPanel(context, undefined, '#ffffff', xStartPos + 20 + maxTextLabelWidth, calculatedYPos - increment * 60,
			calculatedBarWidth, increment * 60);

		const firstValue = Number(this.getTextValue(minValue, numberFormat, fractionDigits));
		const lastValue = Number(this.getTextValue(minValue + 60 * textIncrement, numberFormat, fractionDigits));
		const lastValueYPosition = calculatedYPos - 60 * increment;
		if (!valueToPrintYPos) {
			valueToPrintYPos = range(lastValue, firstValue, lastValueYPosition, calculatedYPos, valueToPrint);
		}
		if (valueToPrint > minValue) {
			context.beginPath();
			context.lineWidth = 1;
			context.fillStyle = getTextBackgroundColor(this.chart.options.chartMeterOptions.levels, valueToPrint);
			context.fillRect(xStartPos + 25 + maxTextLabelWidth, valueToPrintYPos, calculatedBarWidth - 10, calculatedYPos - valueToPrintYPos);
			context.closePath();
		}
	},
	getTextValue:                 function(value, numberFormat, fractionDigits) {
		if (numberFormat) {
			return new DecimalFormat(numberFormat).format(value);
		} else {
			return (value).toFixed(fractionDigits);
		}
	},
	getTextValueForLimits:        function(index, originalTextValue, minValue, maxValue, numberFormat) {
		const medianValue = median([minValue, maxValue]);

		if (index === 0) {
			return new DecimalFormat(numberFormat).format(minValue);
		} else if (index === 10) {
			return new DecimalFormat(numberFormat).format(quartile_25([minValue, medianValue]));
		} else if (index === 20) {
			return new DecimalFormat(numberFormat).format(quartile_75([minValue, medianValue]));
		} else if (index === 30) {
			return new DecimalFormat(numberFormat).format(medianValue);
		} else if (index === 40) {
			return new DecimalFormat(numberFormat).format(quartile_25([medianValue, maxValue]));
		} else if (index === 50) {
			return new DecimalFormat(numberFormat).format(quartile_75([medianValue, maxValue]));
		} else if (index === 60) {
			return new DecimalFormat(numberFormat).format(maxValue);
		}
		return originalTextValue;
	}
});

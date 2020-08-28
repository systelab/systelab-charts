import {drawRegions, drawTextPanel, getFontSized, getTextBackgroundColor, hideGoalsAndTooltips} from "./chart.common-meter-functions";

let LinearData = class {

	constructor(dataArray, chartMeterOptions) {
		this.text = dataArray.length > 0 ? dataArray[dataArray.length - 1] : '--';
		this.textBackgroundColor = getTextBackgroundColor(chartMeterOptions.levels, dataArray[dataArray.length - 1]);
		this.visualMinValue = chartMeterOptions.minVisualValue;
		this.visualMaxValue = chartMeterOptions.maxVisualValue;
		this.levelMinValue = Math.min(...chartMeterOptions.levels.map(value => value.minValue));
		this.levelMaxValue = Math.max(...chartMeterOptions.levels.map(value => value.maxValue));
		this.dataValue = dataArray[dataArray.length - 1];

		// TODO visualValue must be taken into account based on a parameter
		this.minValue = this.visualMinValue != null ? Math.min(this.visualMinValue, this.levelMinValue) : this.levelMinValue;
		this.maxValue = this.visualMaxValue != null ? Math.max(this.visualMaxValue, this.levelMaxValue) : this.levelMaxValue;

		while (this.dataValue <= this.minValue) {
			this.minValue -= Math.abs(this.dataValue * 0.8);
		}
		while (this.dataValue >= this.maxValue) {
			this.maxValue += Math.abs(this.dataValue * 0.8);
		}

		this.fractionDigits = (this.maxValue - this.minValue) <= 10 ? 1 : 0;
		this.textIncrement = Math.abs((this.maxValue - this.minValue)) / 61;
	}

};

export const LinearMeter = Chart.controllers.bar.extend({
	buildOrUpdateElements:        function() {
		Chart.controllers.bar.prototype.buildOrUpdateElements.call(this);
		hideGoalsAndTooltips(this.chart);
	},
	draw:                         function(ease) {
		// Call super method first
		if (this.chart.options.chartMeterOptions.showHistory) {
			drawRegions(this.chart);
			// Call super method to draw the bars
			Chart.controllers.bar.prototype.draw.call(this, ease);
		} else {
			const context = this.chart.chart.ctx;
			const canvas = this.chart.canvas;
			context.save();
			context.clearRect(0, 0, canvas.width, canvas.height);
			const centerX = canvas.width / 2;
			const centerY = canvas.height / 2;

			const linearData = new LinearData(this._data, this.chart.options.chartMeterOptions);

			context.moveTo(centerX, centerY);

			if (this.chart.options.isHorizontal) {

				const externalPanelHeight = Math.max(120, centerY * 0.75);
				const externalPanelWidth = Math.max(470, centerX + centerX / 2);

				const internalPanelHeight = Math.max(20, centerY / 8);
				const internalPanelWidth = Math.max(80, centerX / 4);

				drawTextPanel(context, '', '#DDDDDD44', centerX / 4, centerY - (centerY / 3), externalPanelWidth,
					externalPanelHeight, this.chart.options.chartMeterOptions.borderColor);

				drawTextPanel(context, linearData.text, linearData.textBackgroundColor, centerX + (centerX / 2.1), centerY - (centerY / 3) + 12,
					internalPanelWidth, internalPanelHeight);

				const increment = Math.max(7, ((centerX + centerX / 2) - (centerX / 7)) / 61);
				this.drawHorizontalTicksLabelsBar(context, centerX / 3, centerY + internalPanelHeight / 3, increment, linearData.minValue,
					linearData.textIncrement, linearData.fractionDigits);

			} else {

				const externalPanelHeight = Math.max(365, canvas.height * 0.9);
				const externalPanelWidth = Math.max(130, centerX / 3);

				const textPanelHeight = Math.max(30, centerY / 8);
				const textPanelWidth = Math.max(98, centerX / 4);
				const calculatedYPos = Math.max(333, externalPanelHeight - textPanelHeight - 20);

				drawTextPanel(context, '', '#DDDDDD44', centerX - centerX / 6, 15, externalPanelWidth,
					externalPanelHeight, this.chart.options.chartMeterOptions.borderColor);

				drawTextPanel(context, linearData.text, linearData.textBackgroundColor, centerX - centerX / 8,
					calculatedYPos + 12, textPanelWidth, textPanelHeight);

				const increment = Math.max(5, (centerY + centerY / 2.25) / 61);
				this.drawVerticalTicksLabelsBar(context, centerX - centerX / 8 + 20, externalPanelHeight - textPanelHeight - 20, increment,
					linearData.minValue, linearData.textIncrement, linearData.fractionDigits);
			}
			context.restore();

		}
	},
	drawHorizontalTicksLabelsBar: function(context, xStartPos, yStartPos, increment, startingValue, textIncrement, fractionDigits) {
		context.beginPath();
		context.strokeStyle = 'darkgray';
		context.font = getFontSized(12, 60, 'Helvetica');
		context.fillStyle = 'darkgray';
		const calculatedYPos = Math.max(175, yStartPos + yStartPos / 5);
		const calculatedYPosForPanels = Math.max(120, yStartPos - yStartPos / 10);
		const calculatedHeight = Math.max(35, yStartPos / 5);
		let valueIndex;
		for (let index = 0; index <= 60; index++) {
			if ((startingValue + index * textIncrement).toFixed(fractionDigits) <= this._data[this._data.length - 1]) {
				valueIndex = index * (this._data[this._data.length - 1] / (startingValue + index * textIncrement));
			}
			switch (index % 10) {
				case 0:
					context.lineWidth = 3;

					const text = (startingValue + index * textIncrement).toFixed(fractionDigits);
					context.fillText(text, xStartPos + index * increment - context.measureText(text).width / 2, calculatedYPos + 15);
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
		const linearGradient = context.createLinearGradient(100, 0, 500, 0);

		linearGradient.addColorStop(0.5, 'lightgray');
		linearGradient.addColorStop(1, 'gray');

		drawTextPanel(context, '', 'white', xStartPos - 5, calculatedYPosForPanels, increment * 61.5, calculatedHeight);

		context.beginPath();
		context.lineWidth = 3;
		context.fillStyle = getTextBackgroundColor(this.chart.options.chartMeterOptions.levels, this._data[this._data.length - 1]);
		context.fillRect(xStartPos, calculatedYPosForPanels + 1, valueIndex * increment + 5, calculatedHeight - 2);
		context.closePath();
	},
	drawVerticalTicksLabelsBar:   function(context, xStartPos, yStartPos, increment, startingValue, textIncrement, fractionDigits) {
		context.beginPath();
		context.strokeStyle = 'darkgray';
		context.font = getFontSized(12, 60, 'Helvetica');
		context.fillStyle = 'darkgray';
		const calculatedYPos = Math.max(333, yStartPos);
		let valueIndex;
		for (let index = 0; index <= 60; index++) {
			if ((startingValue + index * textIncrement).toFixed(fractionDigits) <= this._data[this._data.length - 1]) {
				valueIndex = index * (this._data[this._data.length - 1] / (startingValue + index * textIncrement));
			}
			switch (index % 10) {
				case 0:
					context.lineWidth = 2.5;

					const text = (startingValue + index * textIncrement).toFixed(fractionDigits);
					context.fillText(text, xStartPos - 15 - context.measureText(text).width / 2,
						calculatedYPos - index * increment + context.measureText(text).actualBoundingBoxAscent / 2);
					context.beginPath();
					context.moveTo(xStartPos + 10, calculatedYPos - index * increment);
					context.lineTo(xStartPos, calculatedYPos - index * increment);
					context.stroke();
					context.closePath();
					break;
				case 5:
					context.lineWidth = 1.5;
					context.beginPath();
					context.moveTo(xStartPos + 8, calculatedYPos - index * increment);
					context.lineTo(xStartPos, calculatedYPos - index * increment);
					context.stroke();
					context.closePath();
					break;
				default:
					context.lineWidth = 0.7;
					context.beginPath();
					context.moveTo(xStartPos + 5, calculatedYPos - index * increment);
					context.lineTo(xStartPos, calculatedYPos - index * increment);
					context.stroke();
					context.closePath();
					break;
			}
		}
		const linearGradient = context.createLinearGradient(0, 100, 0, 50);

		linearGradient.addColorStop(0.5, 'lightgray');
		linearGradient.addColorStop(1, 'gray');

		const calculatedBarWidth = Math.max(48, this.chart.canvas.width * 0.06);
		drawTextPanel(context, '', 'white', xStartPos + 20, calculatedYPos - increment * 60,
			calculatedBarWidth, increment * 60);

		context.beginPath();
		context.lineWidth = 3;
		context.fillStyle = getTextBackgroundColor(this.chart.options.chartMeterOptions.levels, this._data[this._data.length - 1]);

		context.fillRect(xStartPos + 25, calculatedYPos - valueIndex * increment, calculatedBarWidth - 10, valueIndex * increment - 1);
		context.closePath();
	}
});

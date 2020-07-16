import {drawRegions, drawTextPanel, getFontSized, getTextBackgroundColor} from "./chart.common-meter-functions";

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
		this.minValue = Math.min(this.visualMinValue, this.levelMinValue);
		this.maxValue = Math.max(this.visualMaxValue, this.levelMaxValue);

		while (this.dataValue <= this.minValue) {
			this.minValue -= Math.abs(this.dataValue * 0.8);
		}
		while (this.dataValue >= this.maxValue) {
			this.maxValue += Math.abs(this.dataValue * 0.8);
		}

		this.fractionDigits = (this.maxValue - this.minValue) < 10 ? 1 : 0;
		this.textIncrement = Math.abs((this.maxValue - this.minValue)) / 61;
	}

};

export const LinearMeter = Chart.controllers.bar.extend({

	draw:                         function(ease) {
		// Call super method first
		if (this.chart.options.chartMeterOptions.showHistory) {
			// Chart.controllers.bar.prototype.draw.apply(this);
			drawRegions(this.chart);
			this.chart.data.datasets[0].hidden = false;
			// Call super method to draw the bars
			Chart.controllers.bar.prototype.draw.call(this, ease);
		} else {
			this.chart.options.tooltips.enabled = false;
			this.chart.data.datasets[0].hidden = true;
			const context = this.chart.chart.ctx;
			const canvas = this.chart.canvas;
			context.save();
			context.clearRect(0, 0, canvas.width, canvas.height);
			const centerX = canvas.width / 2;
			const centerY = canvas.height / 2;

			const linearData = new LinearData(this._data, this.chart.options.chartMeterOptions);

			context.moveTo(centerX, centerY);

			if (this.chart.options.isHorizontal) {

				drawTextPanel(context, '', '#DDDDDD44', centerX / 4, centerY - (centerY / 3), centerX + centerX / 2,
					centerY * 0.75, this.chart.options.chartMeterOptions.borderColor);

				drawTextPanel(context, linearData.text, linearData.textBackgroundColor, centerX + (centerX / 2.1), centerY - (centerY / 3.4), centerX / 4,
					centerY / 8);

				const increment = ((centerX + centerX / 2) - (centerX / 5.7)) / 61;
				this.drawHorizontalTicksLabelsBar(context, centerX / 3, centerY + (centerY / 3.5), increment, linearData.minValue,
					linearData.textIncrement, linearData.fractionDigits);

			} else {

				drawTextPanel(context, '', '#DDDDDD44', centerX - centerX / 6, 15, centerX / 3,
					canvas.height * 0.9, this.chart.options.chartMeterOptions.borderColor);

				drawTextPanel(context, linearData.text, linearData.textBackgroundColor, centerX - centerX / 8,
					canvas.height * 0.85, centerX / 4, centerY / 8);

				const increment = (centerY + centerY / 2.5) / 61;
				this.drawVerticalTicksLabelsBar(context, centerX - centerX / 8 + 15,
					canvas.height * 0.8, increment, linearData.minValue,
					linearData.textIncrement, linearData.fractionDigits);
			}
			context.restore();

		}
	},
	drawHorizontalTicksLabelsBar: function(context, xStartPos, yStartPos, increment, startingValue, textIncrement, fractionDigits) {
		context.beginPath();
		context.strokeStyle = 'darkgray';
		context.font = getFontSized(12, 60, 'Helvetica');
		context.fillStyle = 'darkgray';
		let valueIndex;
		for (let index = 0; index <= 60; index++) {
			if (startingValue + index * textIncrement <= this._data[this._data.length - 1]) {
				valueIndex = index * (this._data[this._data.length - 1] / (startingValue + index * textIncrement));
			}
			switch (index % 10) {
				case 0:
					context.lineWidth = 3;

					const text = (startingValue + index * textIncrement).toFixed(fractionDigits);
					context.fillText(text, xStartPos + index * increment - context.measureText(text).width / 2, yStartPos + 15);
					context.beginPath();
					context.moveTo(xStartPos + index * increment, yStartPos - 10);
					context.lineTo(xStartPos + index * increment, yStartPos);
					context.stroke();
					context.closePath();
					break;
				case 5:
					context.lineWidth = 2;
					context.beginPath();
					context.moveTo(xStartPos + index * increment, yStartPos - 8);
					context.lineTo(xStartPos + index * increment, yStartPos);
					context.stroke();
					context.closePath();
					break;
				default:
					context.lineWidth = 1;
					context.beginPath();
					context.moveTo(xStartPos + index * increment, yStartPos - 5);
					context.lineTo(xStartPos + index * increment, yStartPos);
					context.stroke();
					context.closePath();
					break;
			}
		}
		const linearGradient = context.createLinearGradient(100, 0, 500, 0);

		linearGradient.addColorStop(0.5, 'lightgray');
		linearGradient.addColorStop(1, 'gray');

		drawTextPanel(context, '', 'white', xStartPos, this.chart.canvas.height / 2 - yStartPos / 10, increment * 60,
			yStartPos / 5);

		context.beginPath();
		context.lineWidth = 3;
		context.fillStyle = getTextBackgroundColor(this.chart.options.chartMeterOptions.levels, this._data[this._data.length - 1]);
		context.fillRect(xStartPos + 1, this.chart.canvas.height / 2 - yStartPos / 10 + 1, valueIndex * increment, yStartPos / 5 - 3);
		context.closePath();
	},
	drawVerticalTicksLabelsBar:   function(context, xStartPos, yStartPos, increment, startingValue, textIncrement, fractionDigits) {
		context.beginPath();
		context.strokeStyle = 'darkgray';
		context.font = getFontSized(12, 60, 'Helvetica');
		context.fillStyle = 'darkgray';
		let valueIndex;
		for (let index = 0; index <= 60; index++) {
			if (startingValue + index * textIncrement <= this._data[this._data.length - 1]) {
				valueIndex = index * (this._data[this._data.length - 1] / (startingValue + index * textIncrement));
			}
			switch (index % 10) {
				case 0:
					context.lineWidth = 3;

					const text = (startingValue + index * textIncrement).toFixed(fractionDigits);
					context.fillText(text, xStartPos + -15 - context.measureText(text).width / 2,
						yStartPos - index * increment + context.measureText(text).actualBoundingBoxAscent / 2);
					context.beginPath();
					context.moveTo(xStartPos + 10, yStartPos - index * increment);
					context.lineTo(xStartPos, yStartPos - index * increment);
					context.stroke();
					context.closePath();
					break;
				case 5:
					context.lineWidth = 2;
					context.beginPath();
					context.moveTo(xStartPos + 8, yStartPos - index * increment);
					context.lineTo(xStartPos, yStartPos - index * increment);
					context.stroke();
					context.closePath();
					break;
				default:
					context.lineWidth = 1;
					context.beginPath();
					context.moveTo(xStartPos + 5, yStartPos - index * increment);
					context.lineTo(xStartPos, yStartPos - index * increment);
					context.stroke();
					context.closePath();
					break;
			}
		}
		const linearGradient = context.createLinearGradient(0, 100, 0, 50);

		linearGradient.addColorStop(0.5, 'lightgray');
		linearGradient.addColorStop(1, 'gray');
		const barWidth = this.chart.canvas.width / 2 - (this.chart.canvas.width * 0.05) / 2;
		drawTextPanel(context, '', 'white', barWidth,
			yStartPos - increment * 60, this.chart.canvas.width * 0.05, increment * 61);

		context.beginPath();
		context.lineWidth = 3;
		context.fillStyle = getTextBackgroundColor(this.chart.options.chartMeterOptions.levels, this._data[this._data.length - 1]);
		context.fillRect(barWidth + 1, yStartPos - valueIndex * increment + 4,
			this.chart.canvas.width * 0.05 - 2, valueIndex * increment);
		context.closePath();
	}
});

import {drawRegions, drawTextPanel, getFontSized, getRadius, getTextBackgroundColor} from "./chart.common-meter-functions";

export const LinearMeter = Chart.controllers.bar.extend({

	draw:               function(ease) {
		// Call super method first
		if (this.chart.options.chartMeterOptions.showHistory) {
			// Chart.controllers.bar.prototype.draw.apply(this);
			drawRegions(this.chart);
			this.chart.data.datasets[0].hidden = false;
			// Call super method to draw the bars
			Chart.controllers.bar.prototype.draw.call(this, ease);
		} else {
			// Call super method first
			// Chart.controllers.bar.prototype.draw.call(this, ease);
			this.chart.options.tooltips.enabled = false;
			this.chart.data.datasets[0].hidden = true;
			const context = this.chart.chart.ctx;
			const canvas = this.chart.canvas;
			context.save();
			context.clearRect(0, 0, canvas.width, canvas.height);
			const centerX = canvas.width / 2;
			const centerY = canvas.height / 2;

			const text = this._data.length > 0 ? this._data[this._data.length - 1] : '--';
			const textBackgroundColor = getTextBackgroundColor(this.chart.options.chartMeterOptions.levels, this._data[this._data.length - 1]);

			context.moveTo(centerX, centerY);

			if (this.chart.options.isHorizontal) {

				drawTextPanel(context, '', '#DDDDDD44', centerX / 4, centerY - (centerY / 3), centerX + centerX / 2,
					centerY * 0.75, this.chart.options.chartMeterOptions.borderColor);

				drawTextPanel(context, text, textBackgroundColor, centerX + (centerX / 2.1), centerY - (centerY / 3.4), centerX / 4,
					centerY / 8);

				const visualMinValue = this.chart.options.chartMeterOptions.minVisualValue;
				const visualMaxValue = this.chart.options.chartMeterOptions.maxVisualValue;
				const levelMinValue = Math.min(...this.chart.options.chartMeterOptions.levels.map(value => value.minValue));
				const levelMaxValue = Math.max(...this.chart.options.chartMeterOptions.levels.map(value => value.maxValue));
				const dataValue = this._data[this._data.length - 1];

				// TODO visualValue must be taken into account based on a parameter
				let minValue = Math.min(visualMinValue, levelMinValue);
				let maxValue = Math.max(visualMaxValue, levelMaxValue);

				while (dataValue <= minValue) {
					minValue -= Math.abs(dataValue * 0.8);
				}
				while (dataValue >= maxValue) {
					maxValue += Math.abs(dataValue * 0.8);
				}

				const fractionDigits = (maxValue - minValue) < 10 ? 1 : 0;
				const textIncrement = Math.abs((maxValue - minValue)) / 61;
				const increment = ((centerX + centerX / 2) - (centerX / 5.7)) / 61;
				this.drawTicksLabelsBar(context, centerX / 3, centerY + (centerY / 3.5), increment, minValue, textIncrement, fractionDigits);

			} else {
				const linearGradient = context.createLinearGradient(0, 0, 100, 0);

				linearGradient.addColorStop(1, 'white');
				linearGradient.addColorStop(0, 'lightgray');
				drawTextPanel(context, '', linearGradient, centerX / 2, centerY - (centerY / 3), centerX,
					centerY / 2, this.chart.options.chartMeterOptions.borderColor);

				drawTextPanel(context, text, textBackgroundColor, centerX / 2 + centerX, centerY - (centerY / 2), centerX / 4,
					centerY / 8);
			}
			context.restore();

		}
	},
	drawTicksLabelsBar: function(context, xStartPos, yStartPos, increment, startingValue, textIncrement, fractionDigits) {
		context.beginPath();
		context.strokeStyle = 'darkgray';
		context.font = getFontSized(12, 60, 'Helvetica');
		context.fillStyle = 'darkgray';
		let valueIndex;
		for (let index = 0; index <= 60; index++) {
			if (startingValue + index * textIncrement <= this._data[this._data.length - 1]) {
				valueIndex = index;
				console.log(`${Number((startingValue + index * textIncrement).toFixed(fractionDigits))} -- ${startingValue + index * textIncrement} `);
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
	}
});

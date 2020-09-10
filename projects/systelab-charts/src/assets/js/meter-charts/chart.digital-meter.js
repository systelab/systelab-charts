import {
	ChartMeterData,
	drawRegions,
	drawTextPanel,
	getFontSized,
	getTextBackgroundColor,
	getTextColor,
	hideGoalsAndTooltips
} from './chart.common-meter-functions';

export const DigitalMeter = Chart.controllers.bar.extend({
	buildOrUpdateElements: function() {
		Chart.controllers.bar.prototype.buildOrUpdateElements.call(this);
		hideGoalsAndTooltips(this.chart);
	},
	draw:                  function(ease) {
		// Call super method first
		if (this.chart.options.chartMeterOptions.showHistory) {
			drawRegions(this.chart);
			// Call super method to draw the bars
			Chart.controllers.bar.prototype.draw.call(this, ease);
		} else {
			const chartMeterData = new ChartMeterData(this._data, this.chart.options.chartMeterOptions);
			const context = this.chart.chart.ctx;
			const canvas = this.chart.canvas;
			context.save();
			context.clearRect(0, 0, canvas.width, canvas.height);
			const centerX = canvas.width / 2;
			const centerY = canvas.height / 2;

			const textBackgroundColor = getTextBackgroundColor(this.chart.options.chartMeterOptions.levels, this._data[this._data.length - 1]);

			context.moveTo(centerX, centerY);
			const linearGradient = context.createLinearGradient(0, 0, 0, 75);

			linearGradient.addColorStop(1, textBackgroundColor);
			linearGradient.addColorStop(0, 'white');

			context.font = getFontSized(72, centerY / 4, 'digital-font');
			const measuredWidth = Math.max(context.canvas.width * 0.8, context.measureText(chartMeterData.text).width + 20);

			drawTextPanel(context, chartMeterData.text, linearGradient, centerX - measuredWidth / 2, centerY - (centerY / 4), measuredWidth,
				Math.max(60, centerY / 4), getTextColor(textBackgroundColor), this.chart.options.chartMeterOptions.borderColor);
			context.restore();

		}
	}
});

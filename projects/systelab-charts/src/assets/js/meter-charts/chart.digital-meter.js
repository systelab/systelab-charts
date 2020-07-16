import {drawRegions, drawTextPanel, getTextBackgroundColor} from './chart.common-meter-functions';

export const DigitalMeter = Chart.controllers.bar.extend({

	draw: function(ease) {
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
			const linearGradient = context.createLinearGradient(0, 0, 0, 75);

			linearGradient.addColorStop(1, textBackgroundColor);
			linearGradient.addColorStop(0, 'white');
			drawTextPanel(context, text, linearGradient, centerX / 2, centerY - (centerY / 4), centerX,
				centerY / 4, this.chart.options.chartMeterOptions.borderColor);
			context.restore();

		}
	}
});

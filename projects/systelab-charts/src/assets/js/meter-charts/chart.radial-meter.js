import {drawRegions, drawTextPanel, getRadius, getTextBackgroundColor} from './chart.common-meter-functions';

export const RadialMeter = Chart.controllers.bar.extend({

	draw:                function(ease) {

		if (this.chart.options.chartMeterOptions.showHistory) {
			drawRegions(this.chart);
			this.chart.data.datasets[0].hidden = false;
			// Call super method to draw the bars
			Chart.controllers.bar.prototype.draw.call(this, ease);
		} else {
			// Call super method first
			Chart.controllers.bar.prototype.draw.call(this, ease);
			this.chart.options.tooltips.enabled = false;
			this.chart.data.datasets[0].hidden = true;
			const context = this.chart.chart.ctx;
			const canvas = this.chart.canvas;
			context.save();
			context.clearRect(0, 0, canvas.width, canvas.height);
			const centerX = canvas.width / 2;
			const centerY = canvas.height / 2;
			const radius = canvas.height / 2 - 10;

			let minValue = this.chart.options.chartMeterOptions.minVisualValue;
			let maxValue = this.chart.options.chartMeterOptions.maxVisualValue;

			if (minValue == null) {
				minValue = Math.min(...this.chart.options.chartMeterOptions.levels.map(value => value.minValue));
			}
			if (maxValue == null) {
				maxValue = Math.max(...this.chart.options.chartMeterOptions.levels.map(value => value.maxValue));
			}

			const fractionDigits = (maxValue - minValue) < 10 ? 1 : 0;
			const increment = Math.fround(Number(((maxValue - minValue) / 11).toFixed(fractionDigits)));

			this.drawBackground(context, centerX, centerY, radius);
			this.drawLevels(context, radius, minValue, maxValue, increment);
			this.drawTicksAndLabels(context, radius, increment, fractionDigits);
			const text = this._data.length > 0 ? this._data[this._data.length - 1] : '--';
			const textBackgroundColor = getTextBackgroundColor(this.chart.options.chartMeterOptions.levels, this._data[this._data.length - 1]);
			const width = radius * 2 * .44;
			const linearGradient = context.createLinearGradient(0, 0, 0, 75);

			linearGradient.addColorStop(1, textBackgroundColor);
			linearGradient.addColorStop(0, 'white');
			drawTextPanel(context, text, linearGradient, -width / 2, (radius / 5) - 5, width, radius / 5);
			this.drawNeedle(context, radius, minValue, maxValue);

			context.restore();
			context.translate(-centerX, -centerY);
		}
	},
	drawBackground:      function(context, centerX, centerY, radius) {
		context.beginPath();
		context.fillStyle = this.chart.options.chartMeterOptions.borderColor;
		context.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
		context.fill();
		context.closePath();
		context.beginPath();
		context.arc(centerX, centerY, radius - 15, 0, Math.PI * 2, true);
		const gradients = context.createRadialGradient(centerX, centerY, radius - 15, centerX, centerY, radius - getRadius(radius));
		gradients.addColorStop(1, '#FFFFFF');
		gradients.addColorStop(0, 'darkgray');

		context.fillStyle = gradients;
		context.fill();
		context.closePath();
		context.restore();

		context.translate(centerX, centerY);
	},
	drawLevels:          function(context, radius, minValue, maxValue, increment) {
		this.chart.options.chartMeterOptions.levels.forEach(level => {

			const startAngle = this.convertValueToRad((level.minValue <= minValue) ? minValue : level.minValue, increment);
			const endAngle = this.convertValueToRad((level.maxValue >= maxValue) ? maxValue : level.maxValue, increment);
			context.beginPath();
			context.arc(0, 0, radius - getRadius(radius), Math.PI / 2 + startAngle, Math.PI / 2 + endAngle, false);
			context.lineWidth = 15;
			context.lineCap = 'butt';
			// line color
			context.strokeStyle = level.periodColor;
			context.stroke();
			// glass color
			context.strokeStyle = '#FFFFFF88';
			context.stroke();
			context.closePath();
		});
	},
	drawTicksAndLabels:  function(context, radius, increment, fractionDigits) {
		context.beginPath();
		context.strokeStyle = 'black';
		context.font = '12px Helvetica';

		for (let index = -28; index <= 28; index++) {
			const my30Angle = this.degToRad(index); // Math.PI / 30 * i;
			const mySineAngle = Math.sin(my30Angle);
			const myCoosAngle = -Math.cos(my30Angle);
			let iPointX;
			let iPointY;
			let oPointX;
			let oPointY;

			if (index % 5 === 0) {
				context.lineWidth = 4;
				iPointX = mySineAngle * (radius - radius / 4);
				iPointY = myCoosAngle * (radius - radius / 4);
				oPointX = mySineAngle * (radius - radius / 7);
				oPointY = myCoosAngle * (radius - radius / 7);

				const wPointX = mySineAngle * (radius - radius / 2.5);
				const wPointY = myCoosAngle * (radius - radius / 2.5);
				context.fillStyle = 'black';
				// console.log(`value text: ${((i + 25) * increment / 5)} - ${my30Angle}`);
				context.fillText(((index + 25) * increment / 5).toFixed(fractionDigits), wPointX - 2, wPointY + 4);

			} else if (index > -25 && index < 25) {
				context.lineWidth = 1;
				iPointX = mySineAngle * (radius - radius / 5.5);
				iPointY = myCoosAngle * (radius - radius / 5.5);
				oPointX = mySineAngle * (radius - radius / 7);
				oPointY = myCoosAngle * (radius - radius / 7);
			}

			if (index === -27 || index === 27) {
				iPointX = mySineAngle * (radius - radius / 4);
				iPointY = myCoosAngle * (radius - radius / 4);
				context.beginPath();
				context.fillStyle = 'darkgray';
				context.arc(iPointX, iPointY, 8, 0, 2 * Math.PI, false);
				context.fill();
				context.closePath();
				context.beginPath();
				context.fillStyle = 'lightgray';
				context.arc(iPointX, iPointY, 6, 0, 2 * Math.PI, false);
				context.fill();
				context.closePath();
			} else {
				context.beginPath();
				context.moveTo(iPointX, iPointY);
				context.lineTo(oPointX, oPointY);
				context.stroke();
				context.closePath();
			}
		}
	},
	drawNeedle:          function(context, radius, minValue, maxValue) {
		let value = this._data[this._data.length - 1];

		if (value > maxValue) {
			value = maxValue + 0.25;
		} else if (value < minValue) {
			value = minValue - 0.25;
		}

		const angle = this.degToRad(this.convertValueToAngle(value));
		const sineAngle = Math.sin(angle);
		const cosAngle = -Math.cos(angle);
		const pointX = sineAngle * (3 / 4 * radius);
		const pointY = cosAngle * (3 / 4 * radius);

		context.beginPath();
		context.strokeStyle = 'black';
		context.lineWidth = 6;
		context.lineCap = 'round';
		context.lineJoin = 'round';
		context.moveTo(0, 0);
		context.lineTo(pointX, pointY);
		context.stroke();
		context.closePath();

		context.beginPath();
		context.strokeStyle = '#000000';
		context.fillStyle = 'darkgray';
		context.arc(0, 0, 20, 0, 2 * Math.PI, true);
		context.fill();
		context.closePath();
	},
	degToRad:            function(angle) {
		// Degrees to radians
		return (angle * Math.PI) / 30;
	},
	convertValueToAngle: function(value) {
		return value * 5 - 25;
	},
	convertValueToRad:   function(value, increment) {
		return (((value * increment) * Math.PI) * 30 / 180) + (30 * Math.PI / 180);
	}
});

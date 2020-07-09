(function(Chart) {
	Chart.defaults.digitalMeter = {
		hover:    {
			mode: "label"
		},
		datasets: {
			categoryPercentage: 0.8,
			barPercentage:      0.9,
			animation:          {
				numbers: {
					type:       'number',
					properties: ['x', 'y', 'base', 'width', 'height']
				}
			}
		},
		scales:   {
			xAxes: [{
				type: "category",

				// Specific to Bar Controller
				categoryPercentage: 0.9,
				barPercentage:      0.8,
				offset:             true,
				// grid line settings
				gridLines:          {
					offsetGridLines: true
				},
			}],
			yAxes: [{
				type: "linear"
			}]
		}
	};
	Chart.controllers.digitalMeter = Chart.controllers.bar.extend({

		draw:                function(ease) {
			// Call super method first
			Chart.controllers.bar.prototype.draw.call(this, ease);
			if (this.chart.options.chartMeterOptions.showHistory) {
				// Chart.controllers.bar.prototype.draw.apply(this);
			} else {
				// Now we can do some custom drawing for this dataset. Here we'll draw a red box around the first point in each dataset

				this.chart.options.tooltips.enabled = false;
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

				context.beginPath();
				context.fillStyle = this.chart.options.chartMeterOptions.borderColor;
				context.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
				context.fill();
				context.closePath();
				context.beginPath();
				context.arc(centerX, centerY, radius - 15, 0, Math.PI * 2, true);
				const gradients = context.createRadialGradient(centerX, centerY, radius - 15, centerX, centerY, radius - this.getRadius(radius));
				gradients.addColorStop(1, '#FFFFFF');
				gradients.addColorStop(0, 'darkgray');

				context.fillStyle = gradients;
				context.fill();
				context.closePath();
				context.restore();

				context.translate(centerX, centerY);

				const fractionDigits = (maxValue - minValue) < 10 ? 1 : 0;
				const increment = Math.fround(Number(((maxValue - minValue) / 11).toFixed(fractionDigits)));

				this.drawLevels(context, radius, minValue, maxValue, increment);
				this.drawTicksAndLabels(context, radius, increment, fractionDigits);
				this.drawTextPanel(context, radius);
				this.drawNeedle(context, radius, maxValue);

				context.restore();
				context.translate(-centerX, -centerY);
			}
		},
		drawTextPanel:       function(context, radius) {
			context.beginPath();
			context.moveTo(0, 0);
			const linearGradient = context.createLinearGradient(0, 0, 0, 75);
			const boxSize = this.getBoxSize(context.canvas.width);
			linearGradient.addColorStop(1, '#95D9FF');
			linearGradient.addColorStop(0, 'white');

			context.font = this.getFontSize(context.canvas.width);
			context.fillStyle = linearGradient;
			context.fillRect(boxSize - (radius / 2), radius / 5, radius - this.getRadius(radius) * 2, boxSize);
			context.lineJoin = 'round';
			context.lineWidth = 3;
			context.strokeStyle = 'darkgray';
			context.strokeRect(boxSize - (radius / 2), radius / 5, radius - this.getRadius(radius) * 2, boxSize);
			context.closePath();
			context.fillStyle = '#174967';
			const rightXLimit = boxSize - (radius / 2) + radius - this.getRadius(radius) * 2;
			const text = this._data[this._data.length - 1];
			context.fillText(text, rightXLimit - context.measureText(text).width - 5,
				radius / 5 + context.measureText(text).actualBoundingBoxAscent * 1.25);
		},
		getBoxSize:          function(canvasWidth) {
			const baseWidth = 1000;                   // selected default width for canvas
			const baseBoxSize = 60;                     // default size for font

			const ratio = baseBoxSize / baseWidth;   // calc ratio
			return canvasWidth * ratio;   // get font size based on current width
		},
		getFontSize:         function(canvasWidth) {
			const fontBase = 1000;                   // selected default width for canvas
			const fontSize = 56;                     // default size for font

			const ratio = fontSize / fontBase;   // calc ratio
			const size = canvasWidth * ratio;   // get font size based on current width
			return size.toFixed(0) + 'px digital-font'; // set font
		},
		getRadius:           function(radius) {
			return 0.22 * radius;
		},
		drawLevels:          function(context, radius, minValue,
									  maxValue, increment) {
			this.chart.options.chartMeterOptions.levels.forEach(level => {

				const startAngle = this.convertValueToRad((level.minValue <= minValue) ? minValue : level.minValue, increment);
				const endAngle = this.convertValueToRad((level.maxValue >= maxValue) ? maxValue : level.maxValue, increment);
				context.beginPath();
				context.arc(0, 0, radius - this.getRadius(radius), Math.PI / 2 + startAngle, Math.PI / 2 + endAngle, false);
				context.lineWidth = 15;
				context.lineCap = 'butt';
				// line color
				context.strokeStyle = level.periodColor;
				context.stroke();
				context.closePath();
			});
		},
		drawTicksAndLabels:  function(context, radius, increment, fractionDigits) {
			context.beginPath();
			context.strokeStyle = 'black';
			context.font = '12px Helvetica';

			for (let i = -28; i <= 28; i++) {
				const my30Angle = this.degToRad(i); // Math.PI / 30 * i;
				const mySineAngle = Math.sin(my30Angle);
				const myCoosAngle = -Math.cos(my30Angle);
				let iPointX;
				let iPointY;
				let oPointX;
				let oPointY;

				if (i % 5 === 0) {
					context.lineWidth = 4;
					iPointX = mySineAngle * (radius - radius / 4);
					iPointY = myCoosAngle * (radius - radius / 4);
					oPointX = mySineAngle * (radius - radius / 7);
					oPointY = myCoosAngle * (radius - radius / 7);

					const wPointX = mySineAngle * (radius - radius / 2.5);
					const wPointY = myCoosAngle * (radius - radius / 2.5);
					context.fillStyle = 'black';
					// console.log(`value text: ${((i + 25) * increment / 5)} - ${my30Angle}`);
					context.fillText(((i + 25) * increment / 5).toFixed(fractionDigits), wPointX - 2, wPointY + 4);

				} else if (i > -25 && i < 25) {
					context.lineWidth = 1;
					iPointX = mySineAngle * (radius - radius / 5.5);
					iPointY = myCoosAngle * (radius - radius / 5.5);
					oPointX = mySineAngle * (radius - radius / 7);
					oPointY = myCoosAngle * (radius - radius / 7);
				}

				if (i === -27 || i === 27) {
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
		drawNeedle:          function(context, radius, maxValue) {
			const angle = this.degToRad(this.convertValueToAngle(this._data[this._data.length - 1] > maxValue ? maxValue + 0.25 : this._data[this._data.length - 1]));
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
}).call(this, Chart);

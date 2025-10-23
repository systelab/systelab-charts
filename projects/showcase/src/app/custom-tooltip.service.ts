/*
* This file is an auxiliary service to create custom tooltips for Chart.js charts in Angular.
* It defines a class `customTooltipService` with a method `getCustomTooltip` that handles
* the creation, styling, and positioning of tooltips based on the chart context provided.
* Each project shall create its own version of this service to avoid dependency issues.
* THIS FILE IS ONLY CREATED TO BE USED IN THE SHOWCASE PROJECT.
 */

export class CustomTooltipService {

  public static getCustomTooltip(context: any): void {
	// Tooltip Element
	let tooltipEl = document.getElementById('chartjs-tooltip');

	// Create element on first render
	if (!tooltipEl) {
	  tooltipEl = document.createElement('div');
	  tooltipEl.id = 'chartjs-tooltip';
	  tooltipEl.innerHTML = '<table></table>';
	  document.body.appendChild(tooltipEl);
	}

	// Hide if no tooltip
	const tooltipModel = context.tooltip;
	if (tooltipModel.opacity === 0) {
	  tooltipEl.style.opacity = '0';
	  return;
	}

	// Set caret Position
	tooltipEl.classList.remove('above', 'below', 'no-transform');
	if (tooltipModel.yAlign) {
	  tooltipEl.classList.add(tooltipModel.yAlign);
	} else {
	  tooltipEl.classList.add('no-transform p-2');
	}

	function getBody(bodyItem) {
	  return bodyItem.lines;
	}

	// Set Text
	if (tooltipModel.body) {
	  const titleLines = tooltipModel.title || [];
	  const bodyLines = tooltipModel.body.map(getBody);

	  let innerHtml = '<thead>';

	  titleLines.forEach(function (title) {
		innerHtml += '<tr><th>Custom ' + title + ' Custom</th></tr>';
	  });
	  innerHtml += '</thead><tbody>';

	  bodyLines.forEach(function (body) {
		let style = 'background:' + '#007bff';
		style += '; border-color:' + '#007';
		style += '; border-width: 1px';
		style += '; color: white';
		style += '; padding: 5px 5px';
		style += '; border-radius: 3px';
		const span = '<span style="' + style + '">Custom ' + body + '</span>';
		innerHtml += '<tr><td>' + span + '</td></tr>';
	  });
	  innerHtml += '</tbody>';

	  let tableRoot = tooltipEl.querySelector('table');
	  tableRoot.innerHTML = innerHtml;
	}

	const position = context.chart.canvas.getBoundingClientRect();

	// Display, position, and set styles for font
	tooltipEl.style.opacity = '0.8';
	tooltipEl.style.position = 'absolute';
	tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
	tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
	tooltipEl.style.padding = tooltipModel.padding + 'px ' + tooltipModel.padding + 'px';
	tooltipEl.style.pointerEvents = 'none';
  }
}
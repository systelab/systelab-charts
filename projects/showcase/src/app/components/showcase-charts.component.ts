import { Component } from '@angular/core';

@Component({
	selector:    'showcase-charts',
	templateUrl: 'showcase-charts.component.html'
})
export class ShowcaseChartsComponent {
	public selectedView: string;
	public selectView(view: string) {
		this.selectedView = view;
	}
}

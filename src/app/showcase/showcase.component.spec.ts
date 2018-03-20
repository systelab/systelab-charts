import { async, TestBed } from '@angular/core/testing';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SystelabChartsModule } from '../systelab-charts/systelab-charts.module';
import { ShowcaseChartComponent } from './components/chart/showcase-chart.component';
import { ShowcaseTitleComponent } from './components/showcase-title.component';
import { ShowcaseComponent } from './showcase.component';
import { ShowcaseChartsComponent } from './components/showcase-charts.component';

describe('ShowcaseComponent', () => {
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				ShowcaseComponent,
				ShowcaseTitleComponent,
				ShowcaseChartComponent,
				ShowcaseChartsComponent
			],
			imports:      [
				BrowserModule,
				BrowserAnimationsModule,
				FormsModule,
				SystelabChartsModule
			]
		})
			.compileComponents();
	}));

	it('Should create the showcase app', async(() => {
		const fixture = TestBed.createComponent(ShowcaseComponent);
		const app = fixture.debugElement.componentInstance;
		expect(app)
			.toBeTruthy();
	}));
});

import {async, TestBed} from '@angular/core/testing';
import { ShowcaseComponent } from './showcase.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShowcaseChartComponent } from './components/chart/showcase-chart.component';
import { BrowserModule } from '@angular/platform-browser';
import { SystelabChartsModule } from '../systelab-charts/systelab-charts.module';
import { FormsModule } from '@angular/forms';
import { ShowcaseChartsComponent } from './components/showcase-charts.component';
import { ShowcaseTitleComponent } from './components/showcase-title.component';


describe('ShowCaseComponent', () => {
	let fixture;
	let component;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports:      [
				BrowserModule,
				BrowserAnimationsModule,
				FormsModule,
				SystelabChartsModule
			],
			declarations: [
				ShowcaseComponent,
				ShowcaseTitleComponent,
				ShowcaseChartComponent,
				ShowcaseChartsComponent
			]
		}).compileComponents();

		fixture = TestBed.createComponent(ShowcaseComponent);
		fixture.detectChanges();
		component = fixture.debugElement.componentInstance;
	}));

	it('should create the app', (() => {
		expect(component).toBeTruthy();
	}));

});
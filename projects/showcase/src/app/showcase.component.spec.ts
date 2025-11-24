import { TestBed, waitForAsync } from '@angular/core/testing';
import { ShowcaseComponent } from './showcase.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShowcaseChartLegacyComponent } from './components/showcase-chart-legacy/showcase-chart-legacy.component';
import { BrowserModule } from '@angular/platform-browser';
import { SystelabChartsModule } from 'systelab-charts';
import { FormsModule } from '@angular/forms';
import { ShowcaseChartsComponent } from './components/showcase-charts.component';
import { ShowcaseTitleComponent } from './components/showcase-title.component';
import 'zone.js/testing';


describe('ShowCaseComponent', () => {
	let fixture;
	let component;

	beforeEach(waitForAsync(() => {
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
				ShowcaseChartLegacyComponent,
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

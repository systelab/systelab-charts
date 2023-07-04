import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ShowcaseComponent } from './showcase.component';
import { FormsModule } from '@angular/forms';
import { ShowcaseTitleComponent } from './components/showcase-title.component';
import { ShowcaseChartLegacyComponent } from './components/showcase-chart-legacy/showcase-chart-legacy.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShowcaseChartsComponent } from './components/showcase-charts.component';
import { SystelabChartsModule } from 'systelab-charts';
import { ShowcaseChartComponent } from './components/showcase-chart/showcase-chart.component';

@NgModule({
	imports:      [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		SystelabChartsModule,
	],
	declarations: [
		ShowcaseComponent,
		ShowcaseTitleComponent,
		ShowcaseChartLegacyComponent,
		ShowcaseChartsComponent,
  		ShowcaseChartComponent,
	],
	bootstrap:    [ShowcaseComponent]
})
export class ShowcaseModule {
}

export { ShowcaseComponent } from './showcase.component';

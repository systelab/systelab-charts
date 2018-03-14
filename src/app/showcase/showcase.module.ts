import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ShowcaseComponent } from './showcase.component';
import { FormsModule } from '@angular/forms';
import { ShowcaseTitleComponent } from './components/showcase-title.component';
import { ShowcaseChartComponent } from './components/chart/showcase-chart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SystelabChartsModule } from '../systelab-charts/systelab-charts.module';
import { ShowcaseChartsComponent } from './components/showcase-charts.component';

@NgModule({
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
	],
	bootstrap:    [ShowcaseComponent]
})
export class ShowcaseModule {
}

export { ShowcaseComponent } from './showcase.component';

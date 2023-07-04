import { ModuleWithProviders, NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartLegacyComponent } from './chart-legacy/chart-legacy.component';
import { FormsModule } from '@angular/forms';
import { ChartComponent } from './chart/chart.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
	],
	declarations: [
		ChartLegacyComponent,
		ChartComponent,
  ChartComponent,
	],
	exports: [
		ChartLegacyComponent,
		ChartComponent,
	]
})
export class SystelabChartsModule {
	static forRoot(entryComponents?: Array<Type<any> | any[]>): ModuleWithProviders<SystelabChartsModule> {
		return {
			ngModule: SystelabChartsModule
		};
	}
}

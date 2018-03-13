import { ModuleWithProviders, NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PieComponent } from './piechart/pie.component';
import { ChartComponent } from './chart/chart.component';
import { PercentageCircleComponent } from './percentage-circle/percentage-circle.component';
import {FormsModule} from '@angular/forms';



@NgModule({
	imports: [
		CommonModule,
		FormsModule,
	],
	declarations: [
		PieComponent,
		ChartComponent,
		PercentageCircleComponent
	],
	exports: [
		PieComponent,
		ChartComponent,
		PercentageCircleComponent
	]
})
export class SystelabChartsModule {
	static forRoot(entryComponents?: Array<Type<any> | any[]>): ModuleWithProviders {
		return {
			ngModule: SystelabChartsModule
		};
	}
}

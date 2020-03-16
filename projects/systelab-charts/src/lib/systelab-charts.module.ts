import { ModuleWithProviders, NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './chart/chart.component';
import {FormsModule} from '@angular/forms';



@NgModule({
	imports: [
		CommonModule,
		FormsModule,
	],
	declarations: [
		ChartComponent,
	],
	exports: [
		ChartComponent,
	]
})
export class SystelabChartsModule {
	static forRoot(entryComponents?: Array<Type<any> | any[]>): ModuleWithProviders {
		return {
			ngModule: SystelabChartsModule
		};
	}
}

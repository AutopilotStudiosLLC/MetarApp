import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TafShortForecast } from './taf-short-forecast';

@NgModule({
	declarations: [
		TafShortForecast,
	],
	imports: [
		IonicPageModule.forChild(TafShortForecast),
	],
	exports: [
		TafShortForecast
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class TafShortForecastModule { }

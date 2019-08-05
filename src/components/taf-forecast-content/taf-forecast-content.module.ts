import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TafForecastContent } from './taf-forecast-content';

@NgModule({
	declarations: [
		TafForecastContent,
	],
	imports: [
		IonicPageModule.forChild(TafForecastContent),
	],
	exports: [
		TafForecastContent
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class TafForecastContentModule { }

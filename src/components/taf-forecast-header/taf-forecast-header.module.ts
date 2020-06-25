import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from '@ionic/angular';
import { TafForecastHeader } from './taf-forecast-header';

@NgModule({
	declarations: [
		TafForecastHeader,
	],
	imports: [
		IonicPageModule.forChild(TafForecastHeader),
	],
	exports: [
		TafForecastHeader
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class TafForecastHeaderModule { }

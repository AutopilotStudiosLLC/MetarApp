import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from '@ionic/angular';
import { TafForecastShort } from './taf-forecast-short';

@NgModule({
	declarations: [
		TafForecastShort,
	],
	imports: [
		IonicPageModule.forChild(TafForecastShort),
	],
	exports: [
		TafForecastShort
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class TafForecastShortModule { }

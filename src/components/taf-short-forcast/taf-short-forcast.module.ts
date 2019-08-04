import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TafShortForcast } from './taf-short-forcast';

@NgModule({
	declarations: [
		TafShortForcast,
	],
	imports: [
		IonicPageModule.forChild(TafShortForcast),
	],
	exports: [
		TafShortForcast
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class TafShortForcastModule { }

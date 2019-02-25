import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StationCard } from './station-card';

@NgModule({
	declarations: [
		StationCard,
	],
	imports: [
		IonicPageModule.forChild(StationCard),
	],
	exports: [
		StationCard
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class StationCardModule { }

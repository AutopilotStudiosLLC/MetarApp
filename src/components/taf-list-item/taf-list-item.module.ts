import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TafListItem } from './taf-list-item';
import { TafForecastHeaderModule } from '../taf-forecast-header/taf-forecast-header.module'

@NgModule({
	declarations: [
		TafListItem,
	],
	imports: [
		IonicPageModule.forChild(TafListItem),
		TafForecastHeaderModule
	],
	exports: [
		TafListItem
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class TafListItemModule { }

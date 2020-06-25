import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from '@ionic/angular';
import { TafListItem } from './taf-list-item';
import { TafForecastHeaderModule } from '../taf-forecast-header/taf-forecast-header.module'
import { TafForecastContentModule } from '../taf-forecast-content/taf-forecast-content.module'

@NgModule({
	declarations: [
		TafListItem,
	],
	imports: [
		IonicPageModule.forChild(TafListItem),
		TafForecastHeaderModule,
		TafForecastContentModule
	],
	exports: [
		TafListItem
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class TafListItemModule { }

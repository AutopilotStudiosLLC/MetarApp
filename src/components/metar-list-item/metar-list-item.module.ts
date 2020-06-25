import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from '@ionic/angular';
import { MetarListItem } from './metar-list-item';

@NgModule({
	declarations: [
		MetarListItem,
	],
	imports: [
		IonicPageModule.forChild(MetarListItem),
	],
	exports: [
		MetarListItem
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class MetarListItemModule { }

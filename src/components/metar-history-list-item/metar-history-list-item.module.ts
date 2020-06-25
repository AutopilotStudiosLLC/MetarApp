import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from '@ionic/angular';
import { MetarHistoryListItem } from './metar-history-list-item';

@NgModule({
	declarations: [
		MetarHistoryListItem,
	],
	imports: [
		IonicPageModule.forChild(MetarHistoryListItem),
	],
	exports: [
		MetarHistoryListItem
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class MetarHistoryListItemModule { }

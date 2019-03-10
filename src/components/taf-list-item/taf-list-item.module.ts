import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TafListItem } from './taf-list-item';

@NgModule({
	declarations: [
		TafListItem,
	],
	imports: [
		IonicPageModule.forChild(TafListItem),
	],
	exports: [
		TafListItem
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class TafListItemModule { }

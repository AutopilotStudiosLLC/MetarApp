import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from '@ionic/angular';
import { AirsigmetListItem } from './airsigmet-list-item';

@NgModule({
	declarations: [
		AirsigmetListItem,
	],
	imports: [
		IonicPageModule.forChild(AirsigmetListItem),
	],
	exports: [
		AirsigmetListItem
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AirsigmetListItemModule { }

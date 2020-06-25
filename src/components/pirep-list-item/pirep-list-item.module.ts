import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from '@ionic/angular';
import { PirepListItem } from './pirep-list-item';

@NgModule({
	declarations: [
		PirepListItem,
	],
	imports: [
		IonicPageModule.forChild(PirepListItem),
	],
	exports: [
		PirepListItem
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class PirepListItemModule { }

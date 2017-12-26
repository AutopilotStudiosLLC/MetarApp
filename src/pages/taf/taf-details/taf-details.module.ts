import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {TafDetailsPage} from './taf-details';

@NgModule({
	declarations: [
		TafDetailsPage,
	],
	imports: [
		IonicPageModule.forChild(TafDetailsPage),
	]
})
export class TafDetailsPageModule {
}

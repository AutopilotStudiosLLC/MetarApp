import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Station} from "../../../models/station.model";
import {Taf} from "../../../models/taf.model";
import {SkyCondition} from "../../../models/sky-condition.model";

@IonicPage()
@Component({
	selector: 'page-taf-details',
	templateUrl: 'taf-details.html',
})
export class TafDetailsPage {
	station: Station;
	taf: Taf;

	getSkyConditionPhrase = SkyCondition.getSkyConditionPhrase;

	constructor(public navCtrl: NavController, public navParams: NavParams) {
	}

	ionViewWillLoad() {
		this.station = this.navParams.get('station');
		this.taf = this.navParams.get('taf');
	}

	/*onViewHistory() {
		this.navCtrl.push(MetarHistoryPage, {station: this.station});
	}*/
}

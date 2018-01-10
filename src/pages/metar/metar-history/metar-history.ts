import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Station} from "../../../models/station.model";
import {SkyCondition} from "../../../models/sky-condition.model";
import {Utility} from "../../../models/utility.model";

@IonicPage()
@Component({
	selector: 'page-metar-history',
	templateUrl: 'metar-history.html',
})
export class MetarHistoryPage {
	private station: Station;
	getSkyConditionPhrase = SkyCondition.getSkyConditionPhrase;
	toFahrenheit = Utility.toFahrenheit;

	constructor(public navCtrl: NavController, public navParams: NavParams) {
	}

	ionViewWillLoad() {
		this.station = this.navParams.get('station');
	}

}

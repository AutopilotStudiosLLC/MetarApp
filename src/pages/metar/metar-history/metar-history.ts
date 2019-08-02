import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Station} from "../../../models/station.model";

@IonicPage()
@Component({
	selector: 'page-metar-history',
	templateUrl: 'metar-history.html',
})
export class MetarHistoryPage {
	private station: Station;

	constructor(public navCtrl: NavController, public navParams: NavParams) {
	}

	ionViewWillLoad() {
		this.station = this.navParams.get('station');
	}

}

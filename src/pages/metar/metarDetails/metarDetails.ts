import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Metar} from "../../../models/metar.model";
import {Station} from "../../../models/station.model";
import {MetarHistoryPage} from "../metar-history/metar-history";
import {SkyCondition} from "../../../models/sky-condition.model";
import {Utility} from "../../../models/utility.model";

@IonicPage()
@Component({
	selector: 'page-metar-details',
	templateUrl: 'metarDetails.html',
})
export class MetarDetailsPage {
	station: Station;
	metar: Metar;
	//metarHistoryPage: MetarHistoryPage;

	getSkyConditionPhrase = SkyCondition.getSkyConditionPhrase;
	toFahrenheit = Utility.toFahrenheit;
	metersToFeet = Utility.metersToFeet;

	constructor(public navCtrl: NavController, public navParams: NavParams,
				private alertCtrl: AlertController) {
	}

	ionViewWillLoad() {
		this.station = this.navParams.get('station');
		this.metar = this.navParams.get('metar');
		if(!this.station || !this.metar) {
			const alert = this.alertCtrl.create({
				title: 'Error',
				message: 'Unable to find current station conditions. Please try again.',
				buttons: ['Ok']
			});
			alert.present();
			this.navCtrl.goToRoot({});
		}
	}

	onViewHistory() {
		this.navCtrl.push(MetarHistoryPage, {station: this.station});
	}
}

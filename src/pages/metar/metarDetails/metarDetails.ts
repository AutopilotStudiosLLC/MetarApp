import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Metar} from "../../../models/metar.model";
import {Station} from "../../../models/station.model";
import {MetarHistoryPage} from "../metar-history/metar-history";
import {SkyCondition} from "../../../models/sky-condition.model";
import {Utility} from "../../../models/utility.model";
import {StationService} from "../../../services/station.service";

@IonicPage()
@Component({
	selector: 'page-metar-details',
	templateUrl: 'metarDetails.html',
})
export class MetarDetailsPage {
	station: Station;
	metar: Metar;
	inFavorites: boolean;
	//metarHistoryPage: MetarHistoryPage;

	getSkyConditionPhrase = SkyCondition.getSkyConditionPhrase;
	toFahrenheit = Utility.toFahrenheit;
	metersToFeet = Utility.metersToFeet;

	constructor(public navCtrl: NavController, public navParams: NavParams,
				private alertCtrl: AlertController, private stationService: StationService) {
	}

	ionViewWillLoad() {
		this.station = this.navParams.get('station');
		this.metar = this.navParams.get('metar');
		this.inFavorites = this.stationService.isInFavorites(this.station);
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

	onAddToFavorites(station) {
		this.stationService.addToFavorites(station);
		this.stationService.removeRecent(station);
		this.inFavorites = true;
	}

	onRemoveFromFavorites(station) {
		const alert = this.alertCtrl.create({
			title: 'Remove Station?',
			message: 'Are you sure you want to remove '+station.ident+' from favorite stations?',
			buttons: [
				{
					text: 'Yes',
					handler: () => {
						this.stationService.removeFavorite(station);
						this.inFavorites = false;
					}
				},
				{
					text: 'No',
					role: 'cancel'
				}
			]
		});
		alert.present();
	}
}

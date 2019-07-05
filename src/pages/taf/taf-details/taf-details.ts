import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Station} from "../../../models/station.model";
import {Taf} from "../../../models/taf.model";
import {SkyCondition} from "../../../models/sky-condition.model";
import {StationService} from "../../../services/station.service";
import {Moment} from "moment";
import {InAppBrowser} from "@ionic-native/in-app-browser";

@IonicPage()
@Component({
	selector: 'page-taf-details',
	templateUrl: 'taf-details.html',
})
export class TafDetailsPage {
	station: Station;
	taf: Taf;
	inFavorites: boolean;

	getSkyConditionPhrase = SkyCondition.getSkyConditionPhrase;

	constructor(public navCtrl: NavController, public navParams: NavParams,
				private alertCtrl: AlertController, private stationService: StationService,
				private inAppBrowser: InAppBrowser) {
	}

	ionViewWillLoad() {
		this.station = this.navParams.get('station');
		this.taf = this.navParams.get('taf');
		this.inFavorites = this.stationService.isInFavorites(this.station);
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

	sameDay(fromTime:Moment, toTime:Moment) {
		return fromTime.local().format('MMM D') === toTime.local().format("MMM D");
	}

	onViewStationInfo() {
		this.inAppBrowser.create('https://skyvector.com/airport/' + this.station.ident);
	}
}


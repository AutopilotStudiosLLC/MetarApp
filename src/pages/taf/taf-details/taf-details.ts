import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Station} from "../../../models/station.model";
import {Taf} from "../../../models/taf.model";
import {SkyCondition} from "../../../models/sky-condition.model";
import {StationService} from "../../../services/station.service";
import {ConversionService} from "../../../services/conversion.service";
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
				private conversionService: ConversionService, private inAppBrowser: InAppBrowser) {
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

	tafIssueTime(){
		if (this.taf != null && this.taf.issueTime != null){
			return this.conversionService.convertTimeToConfigured(this.taf.issueTime, 'MMM Do ')
		}
	}

	tafValidFrom(){
		if (this.taf != null && this.taf.validFrom != null){
			return this.conversionService.convertTimeToConfigured(this.taf.validFrom, 'MMM Do ')
		}
	}

	tafValidTo(){
		if (this.taf != null && this.taf.validTo != null){
			return this.conversionService.convertTimeToConfigured(this.taf.validTo, 'MMM Do ')
		}
	}

	tafBulletinTime(){
		if (this.taf != null && this.taf.bulletinTime != null){
			return this.conversionService.convertTimeToConfigured(this.taf.bulletinTime, 'MMM Do ')
		}
	}

	tafElevation(){
		if (this.taf != null && this.taf.elevation != null){
			return this.conversionService.convertMetersToConfigured(Number(this.taf.elevation)).measurementAndUnit;
		}		
	}
	onViewStationInfo() {
		this.inAppBrowser.create('https://skyvector.com/airport/' + this.station.ident);
	}
}


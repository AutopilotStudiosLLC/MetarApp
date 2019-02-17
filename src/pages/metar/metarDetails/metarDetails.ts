import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Metar} from "../../../models/metar.model";
import {Station} from "../../../models/station.model";
import {MetarHistoryPage} from "../metar-history/metar-history";
import {Utility} from "../../../models/utility.model";
import {StationService} from "../../../services/station.service";
import {AddsService} from "../../../services/adds.service";
import {Observable, Observer} from "rxjs";

@IonicPage()
@Component({
	selector: 'page-metar-details',
	templateUrl: 'metarDetails.html',
})
export class MetarDetailsPage {
	station: Station;
	metar: Metar;
	inFavorites: boolean;

	toFahrenheit = Utility.toFahrenheit;
	metersToFeet = Utility.metersToFeet;

	constructor(public navCtrl: NavController, public navParams: NavParams,
				private alertCtrl: AlertController, private stationService: StationService,
				private addsService: AddsService) {
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

	getLatestMetar(): Observable<any> {
		return Observable.create((observer: Observer<any>) => {
			this.addsService.getMetars(this.station.ident, 2)
				.subscribe((metars: Metar[]) => {
					metars.forEach((metar) => {
						this.station.addMetar(metar);
					});
					observer.next(metars);
					observer.complete();
				});
		});
	}

	doRefresh(refresher) {
		this.getLatestMetar().subscribe((response) => {
			this.metar = this.station.getLatestMetar();
			refresher.complete();
		});
	}
}

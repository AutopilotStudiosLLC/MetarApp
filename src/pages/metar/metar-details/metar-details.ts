import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, Platform, ToastController} from 'ionic-angular';
import {Metar} from "../../../models/metar.model";
import {MetarHistoryPage} from "../metar-history/metar-history";
import {StationService} from "../../../services/station.service";
import {AddsService} from "../../../services/adds.service";
import {Observable, Observer} from "rxjs";
import {ConversionService} from "../../../services/conversion.service";
import {MetarConversions} from "../../../architecture/metarConversions";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {ConfigService} from "../../../services/config.service";

@IonicPage()
@Component({
	selector: 'page-metar-details',
	templateUrl: 'metar-details.html',
})
export class MetarDetailsPage extends MetarConversions {
	inFavorites: boolean;

	constructor(public navCtrl: NavController, public navParams: NavParams,
				private alertCtrl: AlertController, private stationService: StationService,
				private addsService: AddsService, private toastController:ToastController,
				private platform: Platform, protected conversionService: ConversionService,
				private inAppBrowser: InAppBrowser, protected configService: ConfigService) {

		super(conversionService, configService);

		//On Resume
		platform.resume.subscribe(() => {
			const metarAge = this.metar.getObservationTimeFromNow();
			const timeRetrieved = this.metar.getRetrievalTimeFromNow();
			if(metarAge >= 15 && timeRetrieved >= 5) {
				this.getLatestMetar();
				const toast = this.toastController.create({
					message: 'Checking for new weather data.',
					duration: 3000,
					position: 'top'
				});
				toast.present();
			}
		})
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

		this.platform.resume.subscribe(() => {
			this.getLatestMetar();
		});
	}

	onViewHistory() {
		this.navCtrl.push(MetarHistoryPage, {station: this.station});
	}

	onViewStationInfo() {
		this.inAppBrowser.create('https://skyvector.com/airport/' + this.station.ident);
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
					this.metar = this.station.getLatestMetar();
					observer.next(metars);
					observer.complete();
				});
		});
	}

	doRefresh(refresher) {
		this.getLatestMetar().subscribe((metars: Metar[]) => {
			refresher.complete();
		});
	}
}

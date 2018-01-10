import {Component} from '@angular/core';
import {AlertController, LoadingController, NavController} from 'ionic-angular';
import {Station} from "../../models/station.model";
import {MetarDetailsPage} from "../metar/metarDetails/metarDetails";
import {StationService} from "../../services/station.service";
import {AddsService} from "../../services/adds.service";

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	metarDetailsPage = MetarDetailsPage;

	stationString: string;

	favorites: Station[] = [];
	recent: Station[] = [];


	constructor(public navCtrl: NavController, private stationService: StationService,
				private loadingCtrl: LoadingController, private alertCtrl: AlertController,
				private addsService: AddsService) {

	}

	ionViewWillEnter() {
		this.recent = this.stationService.getRecent();
		this.favorites = this.stationService.getFavorites();
	}

	onStationSearch(ident: string) {
		ident = ident.toUpperCase();
		const loading = this.loadingCtrl.create({
			"content": "Searching for station..."
		});
		loading.present();
		this.addsService.getStation(ident)
			.subscribe(
				(station) => {
					loading.dismiss();
					this.stationService.addToRecent(station);
					this.recent = this.stationService.getRecent();
				},
				(error) => {
					loading.dismiss();
					const alert = this.alertCtrl.create({
						title: 'Error',
						message: 'Unable to find the requested station.' + error.message,
						buttons: ['Ok']
					});
					alert.present();
				});
	}

	onInputText() {
		this.stationString = this.stationString.toUpperCase();
	}

}

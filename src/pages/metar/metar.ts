import {Component} from '@angular/core';
import {AlertController, IonicPage, ItemSliding, LoadingController, NavController, NavParams} from 'ionic-angular';
import {MetarDetailsPage} from "./metarDetails/metarDetails";
import 'rxjs/Rx';
import {Station} from "../../models/station.model";
import {AddsService} from "../../services/adds.service";
import {StationService} from "../../services/station.service";

@IonicPage()
@Component({
	selector: 'page-metar',
	templateUrl: 'metar.html',
	providers: [AddsService]
})
export class MetarPage {

	metarDetailsPage = MetarDetailsPage;

	stationString: string;

	favorites: Station[] = [];
	local: Station[] = [];
	recent: Station[] = [];

	constructor(public navCtrl: NavController, public navParams: NavParams,
				private addsService: AddsService, private alertCtrl: AlertController,
				private stationService: StationService, private loadingCtrl:LoadingController) {
	}

	itemSelected(metar) {
		this.navCtrl.push(MetarDetailsPage, {metar: metar})
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
		const station = this.stationService.getStation(ident);
		this.addsService.getMetars(ident)
			.subscribe(
			(metars) => {
				loading.dismiss();
				station.addMetarArray(metars);
				this.stationService.addToRecent(station);
				this.recent = this.stationService.getRecent();
				this.navCtrl.push(MetarDetailsPage, {station: station, metar: station.getLatestMetar()})
			},
			(error) => {
				loading.dismiss();
				const alert = this.alertCtrl.create({
					title: 'Error',
					message: 'Unable to find the requested station.',
					buttons: ['Ok']
				});
				alert.present();
			});
	}

	onInputText() {
		this.stationString = this.stationString.toUpperCase();
	}

	onAddToFavorites(slidingItem: ItemSliding, station:Station) {
		console.log(station);
		//slidingItem.close();
		//this.stationService.addToFavorites(station);
		//this.favorites = this.stationService.getFavorites();

		//this.onRemoveRecent(station);

		/*this.stationService.addToFavorites(station);
		this.favorites = this.stationService.getFavorites();
		this.stationService.removeRecent(station);
		this.recent = this.stationService.getRecent();*/
	}

	onRemoveRecent(station:Station) {
		this.recent.splice(this.recent.findIndex(
			(el) => el === station),
			1);
	}
}

import {Component} from '@angular/core';
import {AlertController, IonicPage, ItemSliding, LoadingController, NavController, NavParams} from 'ionic-angular';
import {MetarDetailsPage} from "./metar-details/metar-details";
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

	lastUpdated: Date;

	favorites: Station[] = [];
	local: Station[] = [];
	recent: Station[] = [];

	constructor(public navCtrl: NavController, public navParams: NavParams,
				private addsService: AddsService, private alertCtrl: AlertController,
				private stationService: StationService, private loadingCtrl:LoadingController) {
	}

	ionViewWillEnter() {
		this.updateAllStations()
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
				this.stationString = '';
				station.addMetarArray(metars);
				this.stationService.addToRecent(station);
				this.recent = this.stationService.getRecent();
				this.navCtrl.push(MetarDetailsPage, {station: station, metar: station.getLatestMetar()})
			},
			(error) => {
				loading.dismiss();
				this.stationString = '';
				const alert = this.alertCtrl.create({
					title: 'Error',
					message: 'Unable to find the requested station.',
					buttons: ['Ok']
				});
				alert.present();
			});
	}

	updateAllStations(): Promise <any> {
		const favorites = this.stationService.loadFavorites();
		const recent = this.stationService.loadRecent();
		const local = this.updateLocals();

		return Promise.all([favorites, recent, local])
			.then(() => {
				this.favorites = this.stationService.getFavorites().filter((station) => {
					return station.isMetarSupported || station.getLatestMetar();
				});
				this.recent = this.stationService.getRecent().filter((station) => {
					return station.isMetarSupported || station.getLatestMetar();
				});
				this.lastUpdated = new Date();
			});
	}

	updateLocals(): Promise <any> {
		return this.stationService.getLocalStations()
			.then((locale) => {
				locale.subscribe((stations) => {
					this.local = stations.filter((station) => station.isMetarSupported || station.getLatestMetar());
					this.sortLocalStationsByDistance();
					this.updateStationMetars();
				});
			});
	}

	private updateStationMetars(): Promise <any> {
		let stationArray = this.local.map((el) => el.ident);
		stationArray.push(...this.recent.map((el)=> el.ident));
		stationArray.push(...this.favorites.map((el)=> el.ident));

		const stationString = stationArray.join(',');

		return new Promise((resolve) => {
			this.addsService.getMetarsFromStationList(stationString, 2)
				.subscribe((metars) => {
					metars.forEach((metar) => {
						const station = this.stationService.getStation(metar.ident);
						station.addMetar(metar);
					});

					resolve(metars);
				});
		});
	}

	sortLocalStationsByDistance() {
		this.local.sort((a: Station, b: Station) => {
			if (a.getDistanceInKm() < b.getDistanceInKm()) {
				return -1;
			} else if (a.getDistanceInKm() > b.getDistanceInKm()) {
				return 1;
			} else {
				return 0;
			}
		});
		return this.local;
	}

	onInputText() {
		this.stationString = this.stationString.toUpperCase();
	}

	onAddToFavorites(slidingItem: ItemSliding, station:Station) {
		slidingItem.close();
		this.stationService.addToFavorites(station);
		this.favorites = this.stationService.getFavorites()
			.filter((station) => station.isMetarSupported || station.getLatestMetar());

		this.onRemoveRecent(station);
		this.stationService.removeRecent(station);
	}

	onRemoveRecent(station:Station) {
		const index = this.recent.findIndex((el) => el === station);
		if(index !== -1) {
			this.recent.splice(index, 1);
		}
	}

	onRemoveFavorite(station:Station) {
		this.stationService.removeFavorite(station);
		const index = this.favorites.findIndex((el) => el === station);
		if(index !== -1) {
			this.favorites.splice(index, 1);
		}
	}

	doRefresh(refresher) {
		this.updateAllStations()
			.then(() => {
				refresher.complete();
			})
	}
}

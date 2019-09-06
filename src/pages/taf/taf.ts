import {Component} from '@angular/core';
import {AlertController, IonicPage, ItemSliding, LoadingController, NavController, NavParams} from 'ionic-angular';
import {TafDetailsPage} from "./taf-details/taf-details";
import {Station} from "../../models/station.model";
import {AddsService} from "../../services/adds.service";
import {StationService} from "../../services/station.service";

@IonicPage()
@Component({
	selector: 'page-taf',
	templateUrl: 'taf.html',
})
export class TafPage {

	tafDetailsPage = TafDetailsPage;

	stationString: string;

	lastUpdated: Date;

	favorites: Station[] = [];
	local: Station[] = [];
	recent: Station[] = [];

	constructor(public navCtrl: NavController, public navParams: NavParams,
				private addsService: AddsService, private alertCtrl: AlertController,
				private loadingCtrl: LoadingController, private stationService: StationService) {
	}

	ionViewWillEnter() {
		this.updateAllStations()
	}

	onStationSearch(ident: string) {
		const loading = this.loadingCtrl.create({
			"content": "Searching for station..."
		});
		loading.present();
		const station = this.stationService.getStation(ident);
		this.addsService.getTafs(ident)
			.subscribe(
				(tafs) => {
					loading.dismiss();
					this.stationString = '';
					if(Array.isArray(tafs) && tafs.length > 0) {
						station.addTafArray(tafs);
						this.stationService.addToRecent(station);
						this.recent = this.stationService.getRecent();
						this.navCtrl.push(this.tafDetailsPage, {station: station, taf: station.getLatestTaf()})
					} else {
						const alert = this.alertCtrl.create({
							title: 'Not Found',
							message: 'Unable to find forecast for the requested station. It\'s possible that forecasts are not supported by this station.',
							buttons: ['Ok']
						});
						alert.present();
					}
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

	onInputText() {
		this.stationString = this.stationString.toUpperCase();
	}

	updateAllStations(): Promise <any> {
		const favorites = this.stationService.loadFavorites();
		const recent = this.stationService.loadRecent();
		const local = this.updateLocals();

		return Promise.all([favorites, recent, local])
			.then(() => {
				this.favorites = this.stationService.getFavorites().filter((station) => {
					return station.isTafSupported || station.getLatestTaf();
				});
				this.recent = this.stationService.getRecent().filter((station) => {
					return station.isTafSupported || station.getLatestTaf();
				});
				this.lastUpdated = new Date();
			});
	}

	updateLocals(): Promise <any> {
		return this.stationService.getLocalStations()
			.then((locale) => {
				locale.subscribe((stations) => {
					this.local = stations.filter((station) => {
						return station.isTafSupported;
					});
					this.sortLocalStationsByDistance();
					this.updateStationTafs();
				});
			});
	}

	private updateStationTafs(): Promise <any> {
		let stationArray = this.local.map((el) => el.ident);
		stationArray.push(...this.recent.map((el)=> el.ident));
		stationArray.push(...this.favorites.map((el)=> el.ident));

		const stationString = stationArray.join(',');

		return new Promise((resolve) => {
			this.addsService.getTafsFromStationList(stationString, 2)
				.subscribe((tafs) => {
					tafs.forEach((taf) => {
						const station = this.stationService.getStation(taf.ident);
						station.addTaf(taf);
					});

					resolve(tafs);
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

	onAddToFavorites(slidingItem: ItemSliding, station:Station) {
		slidingItem.close();
		this.stationService.addToFavorites(station);
		this.favorites = this.stationService.getFavorites()
			.filter((station) => station.isTafSupported || station.getLatestTaf());

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

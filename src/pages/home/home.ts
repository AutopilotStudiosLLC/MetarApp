import {Component} from '@angular/core';
import {AlertController, LoadingController, NavController, Platform, ToastController} from 'ionic-angular';
import {Station} from "../../models/station.model";
import {MetarDetailsPage} from "../metar/metarDetails/metarDetails";
import {StationService} from "../../services/station.service";
import {AddsService} from "../../services/adds.service";
import {TafDetailsPage} from "../taf/taf-details/taf-details";
import {FlightPlanService} from "../../services/flight-plan.service";
import * as Constants from '../../services/constants';
import {Metar} from "../../models/metar.model";

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	BUILD_VERSION = Constants.BUILD_VERSION;
	metarDetailsPage = MetarDetailsPage;
	tafDetailsPage = TafDetailsPage;

	stationString: string;

	lastUpdated: Date;

	favorites: Station[] = [];
	recent: Station[] = [];
	localStations: Station[] = [];

	constructor(public navCtrl: NavController, private stationService: StationService,
				private loadingCtrl: LoadingController, private alertCtrl: AlertController,
				private addsService: AddsService, private platform: Platform,
				private flightPlanService: FlightPlanService, private toastController: ToastController) {

	}

	ngOnInit() {
		//Display Disclaimer when the app is launched, unless already dismissed.
		if(localStorage.getItem('disclaimer') !== Constants.BUILD_VERSION) {
			const alert = this.alertCtrl.create({
				title: 'Important',
				message: 'Although we try our best to provide the most up to date and accurate information, the accuracy of ' +
					'the information presented cannot be guaranteed. The information retrieved through this application is for ' +
					'reference only. For official flight weather information please contact flight service. \n\nFly safe!',
				inputs: [
					{
						name: 'dismissDisclaimer',
						label: 'I understand, hide disclaimer.',
						value: 'Dismissed',
						type: 'checkbox'
					}
				],
				buttons: [{
					text: 'Agree',
					handler: data => {
						if (Array.isArray(data) && data.pop() === 'Dismissed') {
							localStorage.setItem('disclaimer', Constants.BUILD_VERSION);
						}
					}
				}]
			});
			alert.present();
		}
	}

	ionViewWillEnter() {
		this.updateAllStations();

		this.platform.resume.subscribe(() => {
			this.updateAllStations();
		});

		setInterval(() => {
			this.updateAllStations();
		}, 1000*60*5);
	}

	updateAllStations(): Promise <any> {
		const favorites = this.stationService.loadFavorites();
		const recent = this.stationService.loadRecent();
		const local = this.updateLocals();

		return Promise.all([favorites, recent, local])
			.then(() => {
				this.favorites = this.stationService.getFavorites();
				this.recent = this.stationService.getRecent();
				this.lastUpdated = new Date();
			});
	}

	updateLocals(): Promise <any> {
		return this.stationService.getLocalStations()
			.then((locale) => {
				locale.subscribe((stations) => {
					this.localStations = stations;
					this.sortLocalStationsByDistance();
					this.getStationMetars();
				});
			});
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
					this.stationString = '';
					if(station.isMetarSupported) {
						this.addsService.getMetars(station.ident)
							.subscribe((metars: Metar[]) => {
								station.addMetarArray(metars);
							});
					}
				},
				() => {
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

	onRemoveFromRecent(station) {
		const alert = this.alertCtrl.create({
			title: 'Remove Station?',
			message: 'Are you sure you want to remove '+station.ident+' from recent stations?',
			buttons: [
				{
					text: 'Yes',
					handler: () => {
						this.stationService.removeRecent(station);
						this.recent = this.stationService.getRecent();
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

	onRemoveFromFavorites(station) {
		const alert = this.alertCtrl.create({
			title: 'Remove Station?',
			message: 'Are you sure you want to remove '+station.ident+' from favorite stations?',
			buttons: [
				{
					text: 'Yes',
					handler: () => {
						this.stationService.removeFavorite(station);
						this.favorites = this.stationService.getFavorites();
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

	onAddToFavorites(station) {
		this.stationService.addToFavorites(station);
		this.favorites = this.stationService.getFavorites();
		this.stationService.removeRecent(station);
		this.recent = this.stationService.getRecent();
	}

	onViewCurrentConditions(station: Station) {
		let metar = station.getLatestMetar();
		if(metar)
			this.navCtrl.push(this.metarDetailsPage, {station:station, metar:metar});
		else {
			const loading = this.loadingCtrl.create({
				"content": "Finding Current Weather Conditions..."
			});
			loading.present();
			this.addsService.getMetars(station.ident).subscribe(
				(currentMetars) => {
					loading.dismiss();
					if(currentMetars.length > 0) {
						station.addMetarArray(currentMetars);
						this.navCtrl.push(this.metarDetailsPage, {station: station, metar: station.getLatestMetar()});
					} else {
						const alert = this.alertCtrl.create({
							title: 'Squawk 7700',
							message: 'Unable to find current station conditions. Please try again.',
							buttons: ['Ok']
						});
						alert.present();
					}
				},
				() => {
					loading.dismiss();
					const alert = this.alertCtrl.create({
						title: 'Squawk 7700',
						message: 'Unable to find current station conditions. Please try again.',
						buttons: ['Ok']
					});
					alert.present();
				});
		}
	}

	onViewForecastConditions(station: Station) {
		let taf = station.getLatestTaf();
		if(taf)
			this.navCtrl.push(this.tafDetailsPage, {station:station, taf:taf});
		else {
			const loading = this.loadingCtrl.create({
				"content": "Finding Forecasted Weather Conditions..."
			});
			loading.present();
			this.addsService.getTafs(station.ident).subscribe(
				(currentTafs) => {
					loading.dismiss();
					if(currentTafs.length > 0) {
						station.addTafArray(currentTafs);
						this.navCtrl.push(this.tafDetailsPage, {station: station, taf: station.getLatestTaf()});
					} else {
						const alert = this.alertCtrl.create({
							title: 'Squawk 7700',
							message: 'Unable to find current station forecast. Please try again.',
							buttons: ['Ok']
						});
						alert.present();
					}
				},
				(error) => {
					loading.dismiss();
					const alert = this.alertCtrl.create({
						title: 'Squawk 7700',
						message: 'Unable to find current station conditions. Please try again.' + error,
						buttons: ['Ok']
					});
					alert.present();
				});
		}
	}

	onAddToFlightPlan(station: Station) {
		this.flightPlanService.addStation(station);
		const toast = this.toastController.create({
			message: 'Added station ' + station.ident + ' to the flight plan.',
			duration: 3000,
			position: 'top'
		});
		toast.present();
	}

	sortLocalStationsByDistance() {
		this.localStations.sort((a: Station, b: Station) => {
			if (a.getDistanceInKm() < b.getDistanceInKm()) {
				return -1;
			} else if (a.getDistanceInKm() > b.getDistanceInKm()) {
				return 1;
			} else {
				return 0;
			}
		});
		return this.localStations;
	}

	private getStationMetars(): Promise <any> {
		let stationArray= [];
		stationArray.push(...this.recent.map((el)=> el.ident));
		stationArray.push(...this.favorites.map((el)=> el.ident));
		stationArray.push(...this.localStations.map((el) => el.ident));

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

	doRefresh(refresher) {
		this.updateAllStations()
			.then(() => {
				refresher.complete();
			})
	}
}

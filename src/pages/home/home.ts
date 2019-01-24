import {Component} from '@angular/core';
import {AlertController, LoadingController, NavController, Platform} from 'ionic-angular';
import {Station} from "../../models/station.model";
import {MetarDetailsPage} from "../metar/metarDetails/metarDetails";
import {StationService} from "../../services/station.service";
import {AddsService} from "../../services/adds.service";
import {TafDetailsPage} from "../taf/taf-details/taf-details";
import {Utility} from "../../models/utility.model";
import {SkyCondition} from "../../models/sky-condition.model";
import {FlightPlanService} from "../../services/flight-plan.service";

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	metarDetailsPage = MetarDetailsPage;
	tafDetailsPage = TafDetailsPage;

	getSkyConditionPhrase = SkyCondition.getSkyConditionPhrase;
	toFahrenheit = Utility.toFahrenheit;
	metersToFeet = Utility.metersToFeet;

	stationString: string;

	lastUpdated: Date;

	favorites: Station[] = [];
	recent: Station[] = [];
	localStations: Station[] = [];

	constructor(public navCtrl: NavController, private stationService: StationService,
				private loadingCtrl: LoadingController, private alertCtrl: AlertController,
				private addsService: AddsService, private platform: Platform,
				private flightPlanService: FlightPlanService) {

	}

	ionViewWillEnter() {
		this.stationService.loadFavorites()
			.then(() => {
				this.favorites = this.stationService.getFavorites();
			});
		this.stationService.loadRecent()
			.then(() => {
				this.recent = this.stationService.getRecent();
			});

		this.platform.resume.subscribe(() => {
			this.updateLocals();
		});

		this.updateLocals();
		setInterval(() => {
			this.updateLocals();
			this.lastUpdated = new Date();
		}, 1000*60*5);
		this.lastUpdated = new Date();
	}

	updateLocals() {
		this.stationService.getLocalStations()
			.then((locale) => {
				locale.subscribe((stations) => {
					this.localStations = stations;
					this.sortLocalStationsByDistance();
					this.getLocalStationMetars();
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

	onAddToFlightPlan(station: Station) {
		this.flightPlanService.addStation(station);
		const alert = this.alertCtrl.create({
			title: 'Added to Flight Plan',
			message: 'This station was added to the flight plan.',
			buttons: ['Ok']
		});
		alert.present();
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

	private getLocalStationMetars() {
		let stationArray = this.localStations.map((el) => el.ident);

		const stationString = stationArray.join(',');

		this.addsService.getMetarsFromStationList(stationString, 2)
			.subscribe((metars) => {
				metars.forEach((metar) => {
					const station = this.stationService.getStation(metar.ident);
					station.addMetar(metar);
				});
			});
	}
}

import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {FlightPlanService} from "../../services/flight-plan.service";
import {Utility} from "../../models/utility.model";
import {AddsService} from "../../services/adds.service";
import {StationService} from "../../services/station.service";
import {Station} from "../../models/station.model";
import {Metar} from "../../models/metar.model";
import {Taf} from "../../models/taf.model";
import {Pirep} from "../../models/pirep.model";
import {Airsigmet} from "../../models/airsigmet.model";

/**
 * Generated class for the FlightPlanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-flight-plan',
	templateUrl: 'flight-plan.html',
})
export class FlightPlanPage {

	stationString: string;

	toNauticalMiles = Utility.kilometersToNauticalMiles;
	Math = Math;

	sections = {
		navPoints: {
			title: 'Navigation Points',
			open: true
		},
		metars: {
			title: 'METARs (Current Conditions)',
			open: true
		},
		tafs: {
			title: 'TAFs (Forecasts)',
			open: false
		},
		pireps: {
			title: 'Pilot Reports',
			open: false
		},
		airsigmets: {
			title: 'AIRMETs/SIGMETs',
			open: false
		}
	};

	stations: Station[] = [];
	airsigmets: Airsigmet[];
	pireps: Pirep[] = [];

	constructor(public navCtrl: NavController, public navParams: NavParams, private stationService: StationService,
				private flightPlanService: FlightPlanService, private addsService: AddsService,
				private loadingCtrl: LoadingController, private alertCtrl: AlertController) {
	}

	ionViewWillEnter() {
		let stationsToUpdate:string[] = [];
		let flightPlanStations = this.flightPlanService.getStations();
		flightPlanStations.forEach((station) => {
			if(station.latitude == undefined || station.longitude == undefined) {
				stationsToUpdate.push(station.ident);
			}
		});

		if(stationsToUpdate.length > 0) {
			this.addsService.getStationsFromList(stationsToUpdate.join(','))
				.subscribe((stations: Station[]) => {
					stations.forEach((station) => {
						let stationToUpdate = flightPlanStations.find((st) => st.ident === station.ident);
						if (stationToUpdate) {
							stationToUpdate.latitude = station.latitude;
							stationToUpdate.longitude = station.longitude;
							stationToUpdate.elevation = station.elevation;
							stationToUpdate.name = station.name;
							stationToUpdate.state = station.state;
							stationToUpdate.country = station.country;
							stationToUpdate.isMetarSupported = !!station.isMetarSupported;
							stationToUpdate.isTafSupported = !!station.isTafSupported;
						}
					});

					this.updateFlightWeather();
				});
		} else {
			this.updateFlightWeather();
		}
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
					this.flightPlanService.addStation(station);
					this.stationString = '';
					this.updateFlightWeather();
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

	reorderFlightPlanStations(indexes) {
		this.flightPlanService.reorderStations(indexes);
	}

	onToggleSection(section) {
		section.open = !section.open;
	}

	metarStations() {
		return this.stations.filter((station) => station.isMetarSupported);
	}

	tafStations() {
		return this.stations.filter((station) => station.isTafSupported);
	}

	updateFlightWeather() {
		let stations = this.flightPlanService.getStations();

		//If we don't have a start point and an end point there is nothing to do.
		if(stations.length >= 2) {
			const stationList = stations.map((el) => el.ident).join(';');

			this.addsService.getStationsForFlight(stationList)
				.subscribe((stations: Station[]) => {
					// Update the root station list
					this.stations = this.stationService.addStationArray(stations);

					let metarList = stations.filter((station) => station.isMetarSupported)
						.map((station) => station.ident)
						.join(';');

					let tafList = stations.filter((station) => station.isTafSupported)
						.map((station) => station.ident)
						.join(';');

					// Get Metars for Flight
					this.addsService.getMetarsForFlight(metarList)
						.subscribe((metars: Metar[]) => {
							metars.forEach((metar) => {
								let station = this.stations.find((el) => el.ident === metar.ident);
								if (station) {
									station.addMetar(metar);
								}
							});
						});

					// Get Tafs for Flight
					this.addsService.getTafsForFlight(tafList)
						.subscribe((tafs: Taf[]) => {
							tafs.forEach((taf) => {
								let station = this.stations.find((el) => el.ident === taf.ident);
								if (station) {
									station.addTaf(taf);
								}
							});
						});
				});

			// Get Pireps for Flight
			/*this.addsService.getPirepsForFlight(stationList)
                .subscribe((pireps: Pirep[]) => {
                    this.pireps = pireps;
                });*/
		}
	}
}

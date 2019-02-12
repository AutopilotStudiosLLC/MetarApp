import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {FlightPlanService} from "../../services/flight-plan.service";
import {Utility} from "../../models/utility.model";
import {AddsService} from "../../services/adds.service";
import {StationService} from "../../services/station.service";
import {Station} from "../../models/station.model";
import {Metar} from "../../models/metar.model";

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
					})
				});
		}

		let stationIdentList:string[] = [];
		flightPlanStations.forEach((station) => {
			stationIdentList.push(station.ident);
		});
		if(stationIdentList.length > 0) {
			this.addsService.getMetarsFromStationList(stationIdentList.join(','))
				.subscribe((metars: Metar[]) => {
					metars.forEach((metar) => {
						const station = this.flightPlanService.getStation(metar.ident);
						station.addMetar(metar);
					});
				})
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

}

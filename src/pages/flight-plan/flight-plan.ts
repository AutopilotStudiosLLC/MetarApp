import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {FlightPlanService} from "../../services/flight-plan.service";
import {Utility} from "../../models/utility.model";
import {AddsService} from "../../services/adds.service";
import {StationService} from "../../services/station.service";

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

}

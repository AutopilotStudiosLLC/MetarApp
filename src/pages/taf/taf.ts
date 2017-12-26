import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {TafDetailsPage} from "./taf-details/taf-details";
import {Station} from "../../models/station.model";
import {AddsService} from "../../services/adds.service";

/**
 * Generated class for the TafPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-taf',
	templateUrl: 'taf.html',
})
export class TafPage {

	tafDetailsPage = TafDetailsPage;

	stationString: string;

	favorites: Station[] = [
		//new Station("KMAN")
	];
	local: Station[] = [];
	recent: Station[] = [];

	constructor(public navCtrl: NavController, public navParams: NavParams,
				private addsService: AddsService, private alertCtrl: AlertController) {
	}

	ionViewWillEnter() {
		let ident = 'KBOI';
		this.addsService.getTafs(ident)
			.subscribe((station) => {
					let recent = this.recent.find((element) => {
						if(element.ident === ident) return true;
					});
					if(!recent)
						this.recent.push(station);
				},
				() => {
					const alert = this.alertCtrl.create({
						title: 'Error',
						message: 'Unable to find the requested station.',
						buttons: ['Ok']
					});
					alert.present();
				});
	}

	onStationSearch(ident: string) {
		this.addsService.getTafs(ident)
			.subscribe(
				(station) => {
					let recent = this.recent.find((element) => {
						if (element.ident === ident) return true;
					});
					if (!recent)
						this.recent.push(station);
					this.navCtrl.push(this.tafDetailsPage, {station: station, taf: station.getLatestTaf()})
				},
				(error) => {
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

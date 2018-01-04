import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Station} from "../../models/station.model";
import {MetarDetailsPage} from "../metar/metarDetails/metarDetails";
import {StationService} from "../../services/station.service";

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	metarDetailsPage = MetarDetailsPage;

	stationString: string;

	favorites: Station[] = [];


	constructor(public navCtrl: NavController, private stationService: StationService) {

	}

	ionViewWillEnter() {
		this.favorites = this.stationService.getFavorites();
	}

	onStationSearch() {

	}

	onInputText() {
		this.stationString = this.stationString.toUpperCase();
	}

}

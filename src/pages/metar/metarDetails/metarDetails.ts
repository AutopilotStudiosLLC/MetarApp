import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Metar} from "../../../models/metar.model";
import {Station} from "../../../models/station.model";

@IonicPage()
@Component({
	selector: 'page-metar-details',
	templateUrl: 'metarDetails.html',
})
export class MetarDetailsPage  implements OnInit {
	station: Station;
	metar: Metar;

	constructor(public navCtrl: NavController, public navParams: NavParams) {
	}

	ngOnInit() {
		this.station = this.navParams.get('station');
		this.metar = this.navParams.get('metar');
	}
}

import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Metar} from "../../../models/metar";

@IonicPage()
@Component({
	selector: 'page-metar-details',
	templateUrl: 'metarDetails.html',
})
export class MetarDetailsPage  implements OnInit {
	metar: Metar;

	constructor(public navCtrl: NavController, public navParams: NavParams) {
	}

	ngOnInit() {
		this.metar = this.navParams.get('metar');
	}
}

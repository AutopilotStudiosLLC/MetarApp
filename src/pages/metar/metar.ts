import {Component, OnInit} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {MetarDetailsPage} from "./metarDetails/metarDetails";
import 'rxjs/Rx';
import {HttpClient} from "@angular/common/http";
import {Station} from "../../models/station.model";
import {AddsService} from "../../services/adds.service";

@IonicPage()
@Component({
	selector: 'page-metar',
	templateUrl: 'metar.html',
	providers: [AddsService]
})
export class MetarPage implements OnInit {

	metarDetailsPage = MetarDetailsPage;

	favorites: Station[] = [
		//new Station("KMAN")
	];
	local: Station[] = [];
	recent: Station[] = [];

	constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient,
				private addsService: AddsService, private alertCtrl: AlertController) {
	}

	itemSelected(metar) {
		this.navCtrl.push(MetarDetailsPage, {metar: metar})
	}

	ngOnInit() {
		let stationResult = this.addsService.getMetars('KMAN')
			.subscribe((station) => this.recent.push(station),
				() => {
					const alert = this.alertCtrl.create({
						title: 'Error',
						message: 'Unable to find the requested station.',
						buttons: ['Ok']
					});
					alert.present();
				});
	}
}

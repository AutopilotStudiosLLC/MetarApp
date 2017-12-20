import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {MetarDetailsPage} from "./metarDetails/metarDetails";
import {Metar} from "../../models/metar";
import 'rxjs/Rx';
import {HttpClient} from "@angular/common/http";

@IonicPage()
@Component({
	selector: 'page-metar',
	templateUrl: 'metar.html',
})
export class MetarPage implements OnInit{

	metarDetailsPage = MetarDetailsPage;
	stations = [
		new Metar("KEUL 192156Z AUTO 11008KT 10SM CLR 06/M02 A2986 RMK AO2 SLP125 T00611017", "KMAN"),
		new Metar('', "KEUL"),
		new Metar('', "KBOI")
	];

	constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {
	}

	itemSelected(metar) {
		this.navCtrl.push(MetarDetailsPage, {metar:metar})
	}

	ngOnInit() {
		this.http.get('https://aviationweather.gov/adds/dataserver_current/httpparam?dataSource=metars&requestType=retrieve&format=xml&stationString=KMAN&hoursBeforeNow=3')
			.do(result => console.log("XML: ", result))
			.map(result => this.convertToMetar(result))
			.subscribe(
				(response) => this.stations.push(response)
			);
	}

	convertToMetar(xml: string) {
		let parser = new DOMParser();
		const xmlDoc = parser.parseFromString(xml, 'text/xml');
		const raw = xmlDoc.getElementsByTagName('raw_text')[0].childNodes[0].nodeValue;
		const ident = xmlDoc.getElementsByTagName('station_id')[0].childNodes[0].nodeValue;
		return new Metar(raw, ident);
	}
}

import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import 'rxjs/Rx';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-search',
	templateUrl: 'search.html',
})
export class SearchPage {

	results;

	constructor(public navCtrl: NavController, public navParams: NavParams, private http:HttpClient) {
	}

	onSearch() {
		this.http.get('https://aviationweather.gov/adds/dataserver_current/httpparam?dataSource=metars&requestType=retrieve&format=xml&stationString=KSEA,KDE&hoursBeforeNow=3')
			.subscribe(
				(results) => this.results = results
			);
	}

}

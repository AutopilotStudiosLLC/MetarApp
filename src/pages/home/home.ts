import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Station} from "../../models/station.model";
import {MetarDetailsPage} from "../metar/metarDetails/metarDetails";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	metarDetailsPage = MetarDetailsPage;

	favorites: Station[] = [
		new Station('KMAN')
	];


  constructor(public navCtrl: NavController) {

  }

}

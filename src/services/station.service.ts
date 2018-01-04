import {Injectable} from "@angular/core";
import {Station} from "../models/station.model";
import {AddsService} from "./adds.service";
import {Geolocation} from "@ionic-native/geolocation";

@Injectable()
export class StationService {
	private allStations: Station[] = [];

	private favorites: Station[] = [];
	private recent: Station[] = [];

	constructor(private addsService:AddsService, private geolocation:Geolocation) {
	}

	public getFavorites() {
		return this.favorites.slice();
	}

	public addToFavorites(station:Station) {
		let foundStation = this.allStations.find((element) => element.ident == station.ident);
		if(!foundStation) {
			this.allStations.push(station);
			this.favorites.push(station);
		}
		return true;
	}

	public getLocalStations() {
		this.geolocation.getCurrentPosition().then((resp) => {
			this.addsService.getLocal('metar', resp.coords.latitude, resp.coords.longitude, 50)
		}).catch((error) => {
			console.log('Error getting location', error);
		});
	}
}

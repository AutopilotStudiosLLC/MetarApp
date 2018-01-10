import {Injectable} from "@angular/core";
import {Station} from "../models/station.model";
import {AddsService} from "./adds.service";
import {Geolocation} from "@ionic-native/geolocation";

@Injectable()
export class StationService {
	private allStations: Station[] = [];

	private favorites: Station[] = [];
	private recent: Station[] = [];
	private local: Station[] = [];

	constructor(private addsService:AddsService, private geolocation:Geolocation) {
	}

	public getStation(ident: string) {
		let station = this.allStations.find((el) => el.ident == ident);
		if(station)
			return station;
		else {
			station = new Station(ident);
			this.allStations.push(station);
			return station;
		}
	}

	public getFavorites() {
		return this.favorites.slice();
	}

	public getRecent() {
		return this.recent.slice();
	}

	public addToFavorites(station:Station) {
		let foundStation = this.allStations.find((element) => element.ident == station.ident);
		let foundFavorite = this.favorites.find((element) => element.ident == station.ident);
		if(!foundStation) {
			this.allStations.push(station);
		}
		if(!foundFavorite) {
			this.favorites.push(station);
		}
		return true;
	}

	public addToRecent(station:Station) {
		let recent = this.recent.find((element) => {
			if (element.ident === station.ident) return true;
		});
		if (!recent)
			this.recent.push(station);
		else {
			recent.updateWith(station);
		}
	}

	public getLocalStations() {
		this.geolocation.getCurrentPosition().then((resp) => {
			this.addsService.getLocal('metar', resp.coords.latitude, resp.coords.longitude, 50)
		}).catch((error) => {
			console.log('Error getting location', error);
		});
	}
}

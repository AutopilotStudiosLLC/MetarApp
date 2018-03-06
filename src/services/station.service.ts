import {Injectable} from "@angular/core";
import {Station} from "../models/station.model";
import {AddsService} from "./adds.service";
import {Geolocation} from "@ionic-native/geolocation";
import {Observable} from "rxjs/Observable";

@Injectable()
export class StationService {
	private allStations: Station[] = [];

	private favorites: Station[] = [];
	private recent: Station[] = [];
	private localStations: Station[] = [];

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

	public getLocal() {
		return this.localStations.slice();
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

	public removeFavorite(station: Station) {
		let index = this.favorites.findIndex((element) => {
			if (element.ident === station.ident) return true;
		});
		if (index >= 0)
			this.favorites.splice(index, 1);
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

	public removeRecent(station: Station) {
		let index = this.recent.findIndex((element) => {
			if (element.ident === station.ident) return true;
		});
		if (index >= 0)
			this.recent.splice(index, 1);
	}

	public getLocalStations(): Promise<Observable<Station[]>> {
		return this.geolocation.getCurrentPosition().then((resp) => {
			const latitude = resp.coords.latitude;
			const longitude = resp.coords.longitude;
			return this.addsService.getLocalStations(resp.coords.latitude, resp.coords.longitude, 50)
				.map((stations)=>{
					stations.forEach((station) => {
						let master = this.getStation(station.ident);
						master.updateWith(station);
						if(master.isMetarSupported || master.isTafSupported) {
							let found = this.localStations.find((element) => {
								return master === element;
							});
							master.setDistanceFromSource(latitude, longitude);
							if (!found)
								this.localStations.push(master);
						}
					});
					this.localStations.forEach((station, index) => {
						let found = stations.find((element) => station.ident == element.ident);
						if(!found)
							this.localStations.splice(index, 1);
					});
					return this.localStations;
				});
		});
	}
}

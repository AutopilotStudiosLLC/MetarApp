import {Injectable} from "@angular/core";
import {Station} from "../models/station.model";
import {AddsService} from "./adds.service";
import {Geolocation} from "@ionic-native/geolocation";
import {Observable} from "rxjs/Observable";
import {Storage} from "@ionic/storage";

@Injectable()
export class StationService {
	private allStations: Station[] = [];

	private favorites: Station[] = [];
	private recent: Station[] = [];
	private localStations: Station[] = [];

	constructor(private addsService:AddsService, private geolocation:Geolocation, private storage:Storage) {
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

	public addStationArray(stations: Station[]) {
		let addedStations = [];
		stations.forEach((station) => {
			let existingStation = this.allStations.find((el) => el.ident === station.ident);
			if(existingStation) {
				existingStation.updateWith(station);
				addedStations.push(existingStation);
			} else {
				this.allStations.push(station);
				addedStations.push(station);
			}
		});

		return addedStations;
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
			this.saveFavorites()
				.catch( (err) => {
					console.error(err);
					this.favorites.splice(this.favorites.indexOf(station), 1);
				});
		}
		return true;
	}

	public isInFavorites(station:Station) {
		return this.favorites.find((element) => element.ident == station.ident) != null;
	}

	public removeFavorite(station: Station) {
		let index = this.favorites.findIndex((element) => {
			if (element.ident === station.ident) return true;
		});
		if (index >= 0) {
			this.favorites.splice(index, 1);
			this.saveFavorites();
		}
	}

	public addToRecent(station:Station) {
		let recent = this.recent.find((element) => {
			if (element.ident === station.ident) return true;
		});
		if (!recent) {
			let removedStation = null;
			if (this.recent.length > 5) {
				removedStation = this.recent.pop();
			}
			this.recent.unshift(station);
			this.saveRecent()
				.catch(() => {
					if(removedStation) {
						this.recent.push(removedStation);
					}
					this.recent.splice(this.recent.indexOf(station), 1);
				});
		} else {
			recent.updateWith(station);
		}
	}

	public removeRecent(station: Station) {
		let index = this.recent.findIndex((element) => {
			if (element.ident === station.ident) return true;
		});
		if (index >= 0) {
			this.recent.splice(index, 1);
			this.saveRecent();
		}
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

	private saveFavorites() {
		let favoriteList = [];
		this.favorites.forEach((el) => {
			favoriteList.push({
				ident: el.ident,
				latitude: el.latitude,
				longitude: el.longitude,
				elevation: el.elevation,
				name: el.name,
				state: el.state,
				country: el.country,
				isMetarSupported: el.isMetarSupported,
				isTafSupported: el.isTafSupported
			});
		});
		return this.storage.set('favorites', favoriteList);
	}
	private saveRecent() {
		let recentList = [];
		this.recent.forEach((el:Station) => {
			recentList.push({
				ident: el.ident,
				latitude: el.latitude,
				longitude: el.longitude,
				elevation: el.elevation,
				name: el.name,
				state: el.state,
				country: el.country,
				isMetarSupported: el.isMetarSupported,
				isTafSupported: el.isTafSupported
			});
		});
		return this.storage.set('recent', recentList);
	}

	public loadFavorites() {
		return this.storage.get('favorites')
			.then((stations: Station[]) => {
				if(stations) {
					let stationIdentArray = [];
					stations.forEach((el) => stationIdentArray.push(el.ident));

					let revivedStations = stations.map((x) => {
						let station = this.getStation(x.ident);
						station.latitude = x.latitude;
						station.longitude = x.longitude;
						station.elevation = x.elevation;
						station.name = x.name;
						station.state = x.state;
						station.country = x.country;
						station.isMetarSupported = x.isMetarSupported;
						station.isTafSupported = x.isTafSupported;
						return station;
					});

					if(stationIdentArray.length > 0) {
						const stationString = stationIdentArray.join(',');
						this.addsService.getMetarsFromStationList(stationString, 2)
							.subscribe((metars) => {
								revivedStations.forEach((station) => {
									station.addMetarArray(metars.filter((el) => el.ident === station.ident));
								})
							});
					}

					this.favorites = revivedStations != null ? revivedStations : [];
					for (let x in revivedStations) {
						this.addToFavorites(revivedStations[x]);
					}
				}
			})
			.catch();
	}

	public loadRecent(): Promise <any> {
		return this.storage.get('recent')
			.then((stations: Station[]) => {
				if(stations) {
					let stationIdentArray = [];
					stations.forEach((el) => stationIdentArray.push(el.ident));

					let revivedStations = stations.map(x => {
						let station = this.getStation(x.ident);
						station.latitude = x.latitude;
						station.longitude = x.longitude;
						station.elevation = x.elevation;
						station.name = x.name;
						station.state = x.state;
						station.country = x.country;
						station.isMetarSupported = x.isMetarSupported;
						station.isTafSupported = x.isTafSupported;
						return station;
					});

					if(stationIdentArray.length > 0) {
						const stationString = stationIdentArray.join(',');
						this.addsService.getMetarsFromStationList(stationString, 2)
							.subscribe((metars) => {
								revivedStations.forEach((station) => {
									station.addMetarArray(metars.filter((el) => el.ident === station.ident));
								})
							});
					}

					this.recent = revivedStations != null ? revivedStations : [];
					for (let x in revivedStations) {
						this.addToRecent(revivedStations[x]);
					}
				}
			})
			.catch();
	}
}

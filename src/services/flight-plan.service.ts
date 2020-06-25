import {Station} from "../models/station.model";
//import {reorderArray} from "@ionic/angular";

export class FlightPlanService {
	private stations: Station[] = [];

	constructor() {}

	public addStation(station: Station) {
		this.stations.push(station);
	}

	public removeStation(station: Station) {
		let stationIndex = this.stations.findIndex((el) => el.ident === station.ident);
		if(stationIndex >= 0) {
			this.stations.splice(stationIndex, 1);
		}
	}

	public getStations() {
		return this.stations.slice();
	}

	public getStation(ident: string) {
		let station = this.stations.find((el) => el.ident == ident);
		if(station)
			return station;
		else {
			station = new Station(ident);
			this.stations.push(station);
			return station;
		}
	}

	public distanceToRoutePoint(station: Station): number {
		const routePosition = this.stations.findIndex((el) => el === station);
		if (routePosition === 0) {
			return 0;
		} else {
			const previousStation = this.stations[routePosition-1];
			return Math.round(
				Station.calculateDistance(
					previousStation.latitude,
					previousStation.longitude,
					station.latitude,
					station.longitude
				)
			);
		}
	}

	public totalEstimatedRouteDistance(): number {
		//@todo incomplete method
		return 0;
	}

	public reorderStations(indexes) {
		//@todo fix this method
		//this.stations = reorderArray(this.stations, indexes);
	}
}

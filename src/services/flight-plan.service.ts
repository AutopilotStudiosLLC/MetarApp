import {Station} from "../models/station.model";

export class FlightPlanService {
	private stations: Station[] = [];

	constructor() {}

	public addStation(station: Station) {
		this.stations.push(station);
	}

	public getStations() {
		return this.stations.slice();
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
}

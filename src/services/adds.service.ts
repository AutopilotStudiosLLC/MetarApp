import {Station} from "../models/station.model";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Metar} from "../models/metar.model";
import {MetarServiceResponse} from "../models/metar-service-response.model";
import * as moment from 'moment';

@Injectable()
export class AddsService {
	//private static baseUri = 'https://aviationweather.gov/adds/dataserver_current/httpparam';
	//private static baseUri = 'https://aviationweather.autopilotstudios.com/weather';
	private static baseUri = 'http://localhost:8100/api';
	private stations: Station[] = [];

	constructor(private http: HttpClient) {};

	addStation(station:Station) {
		this.stations.push(station);
	}

	addMetarToStationByIdent(ident:string, metars: Metar[]): Station {
		let station = this.getStation(ident);
		station.addMetarArray(metars);
		return station;
	}

	getStation(ident): Station {
		let station = this.stations.find((element) => {
			if(element.ident === ident) return true;
		});
		if(!station) {
			station = new Station(ident);
		}
		this.stations.push(station);
		return station;
	}

	getMetars(ident, hoursBeforeNow:number = 3) {
		return this.http.get(
				AddsService.baseUri+'/metar/'+ident+'/'+hoursBeforeNow,
				{responseType: 'json'}
			)
			.map(
				(response: MetarServiceResponse) => {
					console.log(response);
					const data = response;
					const station = this.getStation(ident);
					for (let x in data.METAR) {
						let dataMetar = data.METAR[x];
						let metar = new Metar(
							dataMetar.raw_text,
							dataMetar.station_id,
							moment.utc(dataMetar.observation_time),
							dataMetar.latitude,
							dataMetar.longitude,
							dataMetar.temp_c,
							dataMetar.dewpoint_c,
							dataMetar.wind_dir_degrees,
							dataMetar.wind_speed_kt,
							dataMetar.visibility_statute_mi,
							dataMetar.altim_in_hg,
							dataMetar.quality_control_flags,
							dataMetar.sky_condition,
							dataMetar.flight_category,
							dataMetar.metar_type,
							dataMetar.elevation_m
						);
						station.addMetar(metar);
					}
					return station;
				}
			);
	}
}

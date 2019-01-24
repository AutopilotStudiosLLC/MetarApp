import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Metar} from "../models/metar.model";
import {MetarServiceResponse, MetarJsonResponse} from "../models/metar-service-response.model";
import * as moment from 'moment';
import {TafServiceResponse} from "../models/taf-service-response.model";
import {Taf} from "../models/taf.model";
import {Station} from "../models/station.model";
import {StationServiceResponse} from "../models/station-service-response.model";
import {SingleStationServiceResponse} from "../models/single-station-service-response.model";

@Injectable()
export class AddsService {
	private static baseUri = 'https://aviationweather.autopilotstudios.com/';
	//private stations: Station[] = [];

	constructor(private http: HttpClient) {};

	getStation(ident) {
		return this.http.get(
			AddsService.baseUri+'station/info/'+ident,
			{responseType: 'json'}
		)
			.map(
				(response: SingleStationServiceResponse) => {
					let dataStation = response.Station;
					let station = new Station(
						dataStation.station_id,
						[],
						[],
						dataStation.latitude,
						dataStation.longitude,
						dataStation.elevation_m,
						dataStation.site,
						dataStation.state,
						dataStation.country,
						!!dataStation.site_type.METAR,
						!!dataStation.site_type.TAF
					);
					return station;
				}
			);
	}

	getLocalStations(latitude:number, longitude:number, distance:number){
		return this.http.get(
			AddsService.baseUri+'station/local/?distance='+distance+'&latitude='+latitude+'&longitude='+longitude,
			{responseType: 'json'}
		)
			.map(
				(response: StationServiceResponse) => {
					const data = response;
					let stations: Station[] = [];
					for (let x in data.Station) {
						let dataStation = data.Station[x];
						let station = new Station(
							dataStation.station_id,
							[],
							[],
							dataStation.latitude,
							dataStation.longitude,
							dataStation.elevation_m,
							dataStation.site,
							dataStation.state,
							dataStation.country,
							!!dataStation.site_type.METAR,
							!!dataStation.site_type.TAF
						);
						stations.push(station);
					}
					return stations;
				}
			);
	}

	getLocalMetars(type:string, latitude:number, longitude:number, distance:number){
		return this.http.get(
			AddsService.baseUri+'station/local/?distance='+distance+'&latitude='+latitude+'&longitude='+longitude,
			{responseType: 'json'}
		)
			.map(
				(response: MetarServiceResponse) => {
					const data = response;
					let stations: Station[] = [];
					/*for (let x in data.Station) {
						let dataStation = data.Station[x];
						let station = new Station(
							dataStation.station_id,
							[],
							[],
							dataStation.latitude,
							dataStation.longitude,
							dataStation.elevation_m,
							dataStation.site,
							dataStation.state,
							dataStation.country,
							!!dataStation.site_type.METAR,
							!!dataStation.site_type.TAF
						);
						stations.push(station);
					}*/
					return stations;
				}
			);
	}

	getLocalTafs(type:string, latitude:number, longitude:number, distance:number){
		return this.http.get(
			AddsService.baseUri+'station/local/?distance='+distance+'&latitude='+latitude+'&longitude='+longitude,
			{responseType: 'json'}
		)
			.map(
				(response: TafServiceResponse) => {
					const data = response;
					let stations: Station[] = [];
					/*for (let x in data.Station) {
						let dataStation = data.Station[x];
						let station = new Station(
							dataStation.station_id,
							[],
							[],
							dataStation.latitude,
							dataStation.longitude,
							dataStation.elevation_m,
							dataStation.site,
							dataStation.state,
							dataStation.country,
							!!dataStation.site_type.METAR,
							!!dataStation.site_type.TAF
						);
						stations.push(station);
					}*/
					return stations;
				}
			);
	}

	getMetars(ident, hoursBeforeNow:number = 3) {
		return this.http.get(
				AddsService.baseUri+'metar/recent/'+ident+'/'+hoursBeforeNow,
				{responseType: 'json'}
			)
			.map(
				(response: MetarServiceResponse) => {
					const data = response;
					let metars: Metar[] = [];
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
							dataMetar.flight_category,
							dataMetar.metar_type,
							dataMetar.elevation_m
						);
						if(dataMetar.wind_gust_kt) {
							metar.windGusts = dataMetar.wind_gust_kt;
						}
						metar.addSkyConditions(dataMetar.sky_condition);
						metar.processWeatherPhenomenon();
						metars.push(metar);
					}
					return metars;
				}
			);
	}

	getMetarsFromStationList(stationString, hoursBeforeNow:number = 3) {
		return this.http.get(
			AddsService.baseUri+'metar/list?stations='+stationString+'&hoursBeforeNow='+hoursBeforeNow,
			{responseType: 'json'}
		)
			.map(
				(response: MetarServiceResponse) => {
					const data = response;
					let metars: Metar[] = [];
					for (let x in data.METAR) {
						const metar = this.mapMetarResponseToModel(data.METAR[x]);
						metars.push(metar);
					}
					return metars;
				}
			);
	}

	getTafs(ident) {
		return this.http.get(
			AddsService.baseUri+'weather/taf/'+ident,
			{responseType: 'json'}
		)
			.map(
				(response: TafServiceResponse) => {
					const data = response;
					let tafs: Taf[] = [];
					for (let x in data.TAF) {
						let dataTaf = data.TAF[x];
						let taf = new Taf(
							dataTaf.station_id,
							dataTaf.raw_text,
							moment.utc(dataTaf.issue_time),
							moment.utc(dataTaf.bulletin_time),
							moment.utc(dataTaf.valid_time_from),
							moment.utc(dataTaf.valid_time_to),
							dataTaf.remarks,
							dataTaf.latitude,
							dataTaf.longitude,
							dataTaf.elevation_m,
							Taf.MapForecasts(dataTaf.forecast)
						);
						tafs.push(taf);
					}
					return tafs;
				}
			);
	}

	private mapMetarResponseToModel(metarJsonResponse: MetarJsonResponse): Metar {
		let metar = new Metar(
			metarJsonResponse.raw_text,
			metarJsonResponse.station_id,
			moment.utc(metarJsonResponse.observation_time),
			metarJsonResponse.latitude,
			metarJsonResponse.longitude,
			metarJsonResponse.temp_c,
			metarJsonResponse.dewpoint_c,
			metarJsonResponse.wind_dir_degrees,
			metarJsonResponse.wind_speed_kt,
			metarJsonResponse.visibility_statute_mi,
			metarJsonResponse.altim_in_hg,
			metarJsonResponse.quality_control_flags,
			metarJsonResponse.flight_category,
			metarJsonResponse.metar_type,
			metarJsonResponse.elevation_m
		);
		if(metarJsonResponse.wind_gust_kt) {
			metar.windGusts = metarJsonResponse.wind_gust_kt;
		}
		metar.addSkyConditions(metarJsonResponse.sky_condition);
		metar.processWeatherPhenomenon();

		return metar;
	}
}

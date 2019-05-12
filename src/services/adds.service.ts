import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Metar} from "../models/metar.model";
import {MetarServiceResponse, MetarJsonResponse} from "../models/metar-service-response.model";
import * as moment from 'moment';
import {TafJsonResponse, TafServiceResponse} from "../models/taf-service-response.model";
import {Taf} from "../models/taf.model";
import {Station} from "../models/station.model";
import {StationServiceResponse, StationResponse} from "../models/station-service-response.model";
import {SingleStationServiceResponse} from "../models/single-station-service-response.model";
import {PirepJsonResponse, PirepServiceResponse} from "../models/pirep-service-response.model";
import {Pirep} from "../models/pirep.model";
import {TurbulenceCondition} from "../models/turbulence-condition";
import {SkyCondition} from "../models/sky-condition.model";
import {IcingCondition} from "../models/icing-condition";

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

	getStationsFromList(stationString) {
		return this.http.get(
			AddsService.baseUri+'station/list?stations='+stationString,
			{responseType: 'json'}
		)
			.map(
				(response: StationServiceResponse) => {
					let stations: Station[] = [];
					if(Array.isArray(response.Station)) {
						response.Station.forEach((el) => {
							const station = AddsService.mapStationResponseToModel(el);
							stations.push(station);
						});
					} else {
						if(response.Station) {
							const station = AddsService.mapStationResponseToModel(response.Station);
							stations.push(station);
						}
					}

					return stations;
				}
			);
	}

	getStationsForFlight(stationString, corridor:number = 50, hoursBeforeNow:number = 2) {
		return this.http.get(
			AddsService.baseUri+'station/flight?path='+stationString+'&corridor='+corridor+'&hoursBeforeNow='+hoursBeforeNow,
			{responseType: 'json'}
		)
			.map(
				(response: StationServiceResponse) => {
					let stations: Station[] = [];
					if(Array.isArray(response.Station)) {
						response.Station.forEach((el) => {
							const station = AddsService.mapStationResponseToModel(el);
							stations.push(station);
						});
					} else {
						if(response.Station) {
							const station = AddsService.mapStationResponseToModel(response.Station);
							stations.push(station);
						}
					}

					return stations;
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

	getMetars(ident, hoursBeforeNow:number = 3) {
		return this.http.get(
				AddsService.baseUri+'metar/recent/'+ident+'/'+hoursBeforeNow,
				{responseType: 'json'}
			)
			.map(
				(response: MetarServiceResponse) => {
					const data = response;
					let metars: Metar[] = [];
					if(Array.isArray(data.METAR)) {
						for (let x in data.METAR) {
							metars.push(AddsService.mapMetarResponseToModel(data.METAR[x]));
						}
					} else {
						metars.push(AddsService.mapMetarResponseToModel(data.METAR));
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
						const metar = AddsService.mapMetarResponseToModel(data.METAR[x]);
						metars.push(metar);
					}
					return metars;
				}
			);
	}

	getMetarsForFlight(stationString, corridor:number = 50, hoursBeforeNow:number = 2) {
		return this.http.get(
			AddsService.baseUri+'metar/flight?path='+stationString+'&corridor='+corridor+'&hoursBeforeNow='+hoursBeforeNow,
			{responseType: 'json'}
		)
			.map(
				(response: MetarServiceResponse) => {
					const data = response;
					let metars: Metar[] = [];
					for (let x in data.METAR) {
						const metar = AddsService.mapMetarResponseToModel(data.METAR[x]);
						metars.push(metar);
					}
					return metars;
				}
			);
	}

	getTafs(ident) {
		return this.http.get(
			AddsService.baseUri+'taf/taf/'+ident,
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

	getTafsForFlight(stationString, corridor:number = 50, hoursBeforeNow:number = 2) {
		return this.http.get(
			AddsService.baseUri+'taf/flight?path='+stationString+'&corridor='+corridor+'&hoursBeforeNow='+hoursBeforeNow,
			{responseType: 'json'}
		)
			.map(
				(response: TafServiceResponse) => {
					const data = response;
					let tafs: Taf[] = [];
					for (let x in data.TAF) {
						tafs.push(
							AddsService.mapTafResponseToModel(data.TAF[x])
						);
					}
					return tafs;
				}
			);
	}

	getPirepsForFlight(stationString, corridor:number = 50, hoursBeforeNow:number = 2) {
		return this.http.get(
			AddsService.baseUri+'pirep/flight?path='+stationString+'&corridor='+corridor+'&hoursBeforeNow='+hoursBeforeNow,
			{responseType: 'json'}
		)
			.map(
				(response: PirepServiceResponse) => {
					const data = response;
					let pireps: Pirep[] = [];
					if(Array.isArray(data.AircraftReport)) {
						for (let x in data.AircraftReport) {
							pireps.push(
								AddsService.mapPirepResponseToModel(data.AircraftReport[x])
							);
						}
					} else {
						pireps.push(
							AddsService.mapPirepResponseToModel(data.AircraftReport)
						)
					}
					return pireps;
				}
			);
	}

	public static mapMetarResponseToModel(metarJsonResponse: MetarJsonResponse): Metar {
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
		metar.addSkyConditions(SkyCondition.MapSkyConditions(metarJsonResponse.sky_condition));
		metar.processWeatherPhenomenon();

		return metar;
	}

	public static mapStationResponseToModel(stationJsonResponse: StationResponse): Station {
		let station: Station;
		try {
			station = new Station(
				stationJsonResponse.station_id,
				[],
				[],
				stationJsonResponse.latitude,
				stationJsonResponse.longitude,
				stationJsonResponse.elevation_m,
				stationJsonResponse.site,
				stationJsonResponse.state,
				stationJsonResponse.country
			);

			if(stationJsonResponse.site_type) {
				station.isMetarSupported = !!stationJsonResponse.site_type.METAR;
				station.isTafSupported = !!stationJsonResponse.site_type.TAF;
				station.isNexradSupported = !!stationJsonResponse.site_type.NEXRAD;
			}
		}
		catch(e) {
			console.error(e);
			console.log(stationJsonResponse);
			station = new Station(stationJsonResponse.station_id);
		}

		return station;
	}

	public static mapTafResponseToModel(tafResponse: TafJsonResponse): Taf {
		return new Taf(
			tafResponse.station_id,
			tafResponse.raw_text,
			moment.utc(tafResponse.issue_time),
			moment.utc(tafResponse.bulletin_time),
			moment.utc(tafResponse.valid_time_from),
			moment.utc(tafResponse.valid_time_to),
			tafResponse.remarks,
			tafResponse.latitude,
			tafResponse.longitude,
			tafResponse.elevation_m,
			Taf.MapForecasts(tafResponse.forecast)
		);
	}

	public static mapPirepResponseToModel(pirepResponse: PirepJsonResponse): Pirep {
		return new Pirep(
			pirepResponse.aircraft_ref,
			pirepResponse.altitude_ft_msl,
			pirepResponse.latitude,
			pirepResponse.longitude,
			moment(pirepResponse.observation_time),
			pirepResponse.quality_control_flags,
			pirepResponse.raw_text,
			pirepResponse.receipt_time,
			pirepResponse.report_type,
			pirepResponse.temp_c,
			pirepResponse.wx_string,
			TurbulenceCondition.MapTurbulenceConditions(pirepResponse.turbulence_condition ? pirepResponse.turbulence_condition : []),
			IcingCondition.MapIcingConditions(pirepResponse.icing_condition ? pirepResponse.icing_condition : []),
			SkyCondition.MapSkyConditions(pirepResponse.sky_condition ? pirepResponse.sky_condition : [])
		);
	}
}

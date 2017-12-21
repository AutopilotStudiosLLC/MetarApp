import {Station} from "../models/station.model";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Metar} from "../models/metar.model";

@Injectable()
export class AddsService {
	//private baseUri = 'https://aviationweather.gov/adds/dataserver_current';
	private static baseUri = 'http://localhost:8100/api/httpparam';
	private static metarParams = 'dataSource=metars&requestType=retrieve&format=xml'; //&compression=gzip';
	private stations: Station[] = [];

	constructor(private http: HttpClient) {};

	addStation(station:Station) {
		this.stations.push(station);
	}

	addMetarToStationByIdent(ident:string, metar: Metar): Station {
		let station = this.stations.find((element) => {
			if(element.ident === ident) return true;
		});
		if(station) {
			station.addMetar(metar);
		} else {
			station = new Station(metar.ident, [metar]);
			this.stations.push(station);
		}
		return station;
	}

	getMetars(ident, hoursBeforeNow:number = 3) {
		return this.http.get(
				AddsService.baseUri+'?'+AddsService.metarParams+'&stationString='+ident+'&hoursBeforeNow='+hoursBeforeNow,
				{responseType: 'text'}
			)
			.map(
				(response) => {
					console.log(response);
					const metar = Metar.parseXMLToMetar(response);
					const station = this.addMetarToStationByIdent(ident, metar);
					console.log(station);
					return station;
				}
			);
	}
}

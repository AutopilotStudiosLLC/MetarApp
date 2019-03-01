import {SkyCondition} from "./sky-condition.model";

export class TafServiceResponse {
	constructor(
		public results: number,
		public TAF: TafJsonResponse[]
	)
	{}
}

class TafJsonResponse {
	constructor(
		public raw_text: string,
		public station_id: string,
		public issue_time: string,
		public bulletin_time: string,
		public valid_time_from: string,
		public valid_time_to: string,
		public remarks: string,
		public latitude: number,
		public longitude: number,
		public elevation_m: number,
		public forecast: ForecastResponse[]
	)
	{}
}

export class ForecastResponse {
	constructor (
		public fcst_time_from: string,
		public fcst_time_to: string,
		public change_indicator: string,
		public wind_dir_degrees: number,
		public wind_gust_kt: number,
		public wind_speed_kt: number,
		public visibility_statute_mi: number,
		public wx_string: string,
		public sky_condition: SkyCondition[] = []
	) {}
}

export class MetarServiceResponse {
	constructor(
		public results: number,
		public METAR: MetarJsonResponse[]
	)
	{}
}

class MetarJsonResponse {
	constructor(
		public raw_text: string,
		public station_id: string,
		public observation_time: string,
		public latitude: number,
		public longitude: number,
		public temp_c: number,
		public dewpoint_c: number,
		public wind_dir_degrees: number,
		public wind_speed_kt: number,
		public visibility_statute_mi: number,
		public altim_in_hg: number,
		public quality_control_flags: MetarQualityControl,
		public wx_string: string,
		public sky_condition: SkyCondition,
		public flight_category: string,
		public metar_type: string,
		public elevation_m: number
	)
	{}
}

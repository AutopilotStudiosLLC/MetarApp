export class StationServiceResponse {
	constructor(
		public results: number,
		public Station: StationResponse[]
	) {}
}

class StationResponse {
	constructor(
		public station_id:string,
		public latitude: number,
		public longitude: number,
		public elevation_m: number,
		public site: string,
		public state,
		public country:string,
		public site_type: SiteResponse
	) {}
}

class SiteResponse {
	constructor(
		public METAR:object,
		public TAF:object
	) {}
}

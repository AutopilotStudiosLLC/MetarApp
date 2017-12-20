import {DateTime} from "ionic-angular";

export class Metar {
	constructor(
		public raw: string,
		public ident: string,
		public observation_time?: DateTime,
		public latitude?: number,
		public longitude?: number,
		public temperature?: number,
		public dewpoint?: number,
		public windDirection?: number,
		public windSpeed?: number,
		public visibility?: number,
		public altimeter?: number,
		public autonomousStation?: boolean,
		public skyCondition?: string,
		public flightCategory?: string,
		public metarType?: string,
		public elevation?: number)
	{}
}

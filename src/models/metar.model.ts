import * as moment from 'moment';
import {SkyCondition} from "./sky-condition.model";
import {MetarQualityControl} from "./metar-quality-control.model";

export class Metar {
	constructor(
		public raw: string,
		public ident: string,
		public observationTime?: moment.Moment,
		public latitude?: number,
		public longitude?: number,
		public temperature?: number,
		public dewpoint?: number,
		public windDirection?: number,
		public windSpeed?: number,
		public visibility?: number,
		public altimeter?: number,
		public qualityControl?: MetarQualityControl,
		public skyCondition?: SkyCondition,
		public flightCategory?: string,
		public metarType?: string,
		public elevation?: number)
	{}
}

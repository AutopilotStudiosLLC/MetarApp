import * as moment from "moment";
import {SkyCondition} from "./sky-condition.model";
import {QualityControl} from "./quality-control";
import {TurbulenceCondition} from "./turbulence-condition";
import {IcingCondition} from "./icing-condition";

export class Pirep {
	constructor(
		public aircraft: string,
		public altitude: number,
		public latitude: number,
		public longitude: number,
		public observationTime: moment.Moment,
		public qualityControl: QualityControl,
		public raw: string,
		public receiptTime: string,
		public reportType: string,
		public temperature: number,
		public weatherString: string,
		public turbulenceCondition: TurbulenceCondition[] = [],
		public icingCondition: IcingCondition[] = [],
		public skyCondition: SkyCondition[] = []
	) {}
}

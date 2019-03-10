import * as moment from "moment";
import {SkyCondition} from "./sky-condition.model";

export class Pirep {

	constructor(
		receiptTime: moment.Moment,
		observationTime: moment.Moment,
		qualityControlFlags: PirepQualityControlFlags,
		aircraftType: string,
		latitude: number,
		longitude: number,
		skyCondition: SkyCondition,
		temperature: number,
		windDirection: number,
		windSpeed: number,
		reportType: string,
		raw: string
	) {}
}

class PirepQualityControlFlags {
	constructor(
		badLocation: string
	) {}
}

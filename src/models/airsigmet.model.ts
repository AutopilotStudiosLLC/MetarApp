import * as moment from 'moment';
import {AirsigmetBoundaryArea} from "./airsigmet-boundary-area.model";
import {AirsigmetHazard} from "./airsigmet-hazard.model";

export class Airsigmet {
	public static readonly TYPE_SIGMET = "SIGMET";
	public static readonly TYPE_AIRMET = "AIRMET";

	constructor(
		public raw: string,
		public validFrom: moment.Moment,
		public validTo: moment.Moment,
		public altitude: AirsigmetAltitudeRange | undefined,
		public movementDirection: number,
		public movementSpeed: number,
		public hazard: AirsigmetHazard,
		public type: string,
		public area: AirsigmetBoundaryArea
	) {}
}


export class AirsigmetAltitudeRange{
	constructor(
		public minimumAltitude: number,
		public maximumAltitude: number
	) {}
}

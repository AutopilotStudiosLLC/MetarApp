import * as moment from "moment";
import {SkyCondition} from "./sky-condition.model";

export class Forecast {
	constructor(
		public fromTime: moment.Moment,
		public toTime: moment.Moment,
		public changeIndicator: string,
		public windDirection: number,
		public windSpeed: number,
		public visibility: number,
		public skyConditions: SkyCondition[] = []
	) {}

	public static mapSkyConditions(skyCondition: SkyCondition[]): SkyCondition[] {
		if(Array.isArray(skyCondition))
			return skyCondition;
		else
			return [skyCondition];
	}
}

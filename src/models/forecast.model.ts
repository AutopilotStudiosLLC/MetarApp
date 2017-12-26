import * as moment from "moment";

export class Forecast {
	constructor(
		public fromTime: moment.Moment,
		public toTime: moment.Moment,
		public changeIndicator: string,
		public windDirection: number,
		public wind_speed_kt: number,
		public visibility: number,
		public skyCondition: SkyCondition[]
	) {}
}

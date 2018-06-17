import * as moment from "moment";
import {Forecast} from "./forecast.model";
import {ForecastResponse} from "./taf-service-response.model";

export class Taf {
	private issueTimeString:string = null;
	private bulletinTimeString:string = null;
	private validFromString:string = null;
	private validToString:string = null;

	constructor(
		public ident: string,
		public raw: string,
		public issueTime?: moment.Moment,
		public bulletinTime?: moment.Moment,
		public validFrom?: moment.Moment,
		public validTo?: moment.Moment,
		public remarks?: string,
		public latitude?: number,
		public longitude?: number,
		public elevation?: number,
		public forecasts?: Forecast[]
	) {}

	public static MapForecasts(casts: ForecastResponse[]): Forecast[] {
		let forecasts: Forecast[] = [];
		casts.forEach((element) => {
			let forecast = new Forecast(
				moment.utc(element.fcst_time_from),
				moment.utc(element.fcst_time_to),
				element.change_indicator,
				element.wind_dir_degrees,
				element.wind_speed_kt,
				element.visibility_statute_mi,
				Forecast.mapSkyConditions(element.sky_condition)
			);
			forecasts.push(forecast);
		});
		return forecasts;
	}

	public sleep() {
		this.issueTimeString = this.issueTime.format();
		this.bulletinTimeString = this.bulletinTime.format();
		this.validFromString = this.validFrom.format();
		this.validToString = this.validTo.format();
		this.issueTime = null;
		this.bulletinTime = null;
		this.validFrom = null;
		this.validTo = null;
	}

	public wakeup() {
		this.issueTime = moment(this.issueTimeString);
		this.issueTime = moment(this.issueTimeString);
		this.issueTime = moment(this.issueTimeString);
		this.issueTime = moment(this.issueTimeString);
	}
}

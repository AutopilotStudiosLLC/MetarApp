import * as moment from "moment";
import {Forecast} from "./forecast.model";
import {ForecastResponse} from "./taf-service-response.model";
import {SkyCondition} from "./sky-condition.model";

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
		if(Array.isArray(casts)) {
			casts.forEach((element) => {
				let forecast = new Forecast(
					moment.utc(element.fcst_time_from),
					moment.utc(element.fcst_time_to),
					element.change_indicator,
					element.wind_dir_degrees,
					element.wind_speed_kt,
					element.visibility_statute_mi,
					SkyCondition.MapSkyConditions(element.sky_condition),
					element.wind_gust_kt,
					element.wx_string
				);
				forecasts.push(forecast);
			});
		} else {
			let cast: ForecastResponse = casts;
			let forecast = new Forecast(
				moment.utc(cast.fcst_time_from),
				moment.utc(cast.fcst_time_to),
				cast.change_indicator,
				cast.wind_dir_degrees,
				cast.wind_speed_kt,
				cast.visibility_statute_mi,
				SkyCondition.MapSkyConditions(cast.sky_condition),
				cast.wind_gust_kt,
				cast.wx_string
			);
			forecasts.push(forecast);
		}
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

import * as moment from "moment";
import {Forecast} from "./forecast.model";
import {ForecastResponse} from "./taf-service-response.model";

export class Taf {
	constructor(
		public ident: string,
		public raw: string,
		public issueTime: moment.Moment,
		public bulletinTime: moment.Moment,
		public validFrom: moment.Moment,
		public validTo: moment.Moment,
		public remarks: string,
		public latitude: number,
		public longitude: number,
		public elevation: number,
		public forcasts?: Forecast[]
	) {}

	public static MapForecasts(casts: ForecastResponse[]): Forecast[] {
		let forecasts: Forecast[] = [];
		casts.forEach((element) => {
			forecasts.push(new Forecast(
				moment.utc(element.fcst_time_from),
				moment.utc(element.fcst_time_to),
				element.change_indicator,
				element.wind_dir_degrees,
				element.wind_speed_kt,
				element.visibility_statute_mi,
				element.sky_condition
			));
		});

		return forecasts;
	}
}

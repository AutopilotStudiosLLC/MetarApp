import {Component, Input} from '@angular/core';
import {ConversionService} from "../../services/conversion.service";
import {Forecast} from "../../models/forecast.model";
import {tafConversions} from "../../architecture/tafConversions";

@Component({
	selector: 'taf-forecast-header',
	templateUrl: 'taf-forecast-header.html'
})

export class TafForecastHeader extends tafConversions {
	@Input() forecast: Forecast;

	constructor(protected conversionService: ConversionService) {
		super(conversionService);
	 }

	forecastSameDay() {
		return this.conversionService.sameDay(this.forecast.fromTime, this.forecast.toTime);
	}
}

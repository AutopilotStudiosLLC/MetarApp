import {Component, Input} from '@angular/core';
import {ConversionService} from "../../services/conversion.service";
import {Forecast} from "../../models/forecast.model";
import {Moment} from "moment";

@Component({
	selector: 'taf-forecast-header',
	templateUrl: 'taf-forecast-header.html'
})

export class TafForecastHeader { 
	@Input() forecast: Forecast;

	constructor(private conversionService: ConversionService) {
		
	 }

	forecastFromTime(): string {
		if(this.forecast != null && this.forecast.fromTime != null){
			return this.conversionService.convertTimeToConfigured(this.forecast.fromTime);
		}
	}

	sameDay(fromTime:Moment, toTime:Moment) {
		return fromTime.local().format('MMM D') === toTime.local().format("MMM D");
	}
}

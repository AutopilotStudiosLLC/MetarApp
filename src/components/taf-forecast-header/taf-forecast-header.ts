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

	forecastFromDay(): string {
		if(this.forecast != null && this.forecast.fromTime != null){
			return this.conversionService.convertTimeToConfiguredCustomFormat(this.forecast.fromTime, 'MMM D');
		}
	}

	forecastToDay(): string {
		if(this.forecast != null && this.forecast.toTime != null){
			return this.conversionService.convertTimeToConfiguredCustomFormat(this.forecast.toTime, 'MMM D');
		}
	}

	forecastFromTime(): string {
		if(this.forecast != null && this.forecast.fromTime != null){
			return this.conversionService.convertTimeToConfigured(this.forecast.fromTime);
		}
	}

	forecastToTime(): string {
		if(this.forecast != null && this.forecast.toTime != null){
			return this.conversionService.convertTimeToConfigured(this.forecast.toTime);
		}
	}

	forecastSameDay() {
		return this.conversionService.sameDay(this.forecast.fromTime, this.forecast.toTime);
	}
}

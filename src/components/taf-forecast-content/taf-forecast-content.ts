import {Component, Input} from '@angular/core';
import {ConversionService} from "../../services/conversion.service";
import {Forecast} from "../../models/forecast.model";

@Component({
	selector: 'taf-forecast-content',
	templateUrl: 'taf-forecast-content.html'
})

export class TafForecastContent { 
	@Input() forecast: Forecast;

	constructor(private conversionService: ConversionService) {
		
	 }

	forecastFromTime(): string {
		if(this.forecast != null && this.forecast.fromTime != null){
			return this.conversionService.convertTimeToConfigured(this.forecast.fromTime);
		}
	}
}

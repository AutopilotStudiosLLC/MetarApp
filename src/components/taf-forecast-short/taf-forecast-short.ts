import {Component, Input} from '@angular/core';
import {ConversionService} from "../../services/conversion.service";
import {Taf} from "../../models/taf.model";

@Component({
	selector: 'taf-forecast-short',
	templateUrl: 'taf-forecast-short.html'
})

export class TafForecastShort { 
	@Input() taf: Taf;

	constructor(private conversionService: ConversionService) {
		
	 }

	forecastFromTime(): string {
		if(this.taf.forecasts[0] != null && this.taf.forecasts[0].fromTime != null){
			return this.conversionService.convertTimeToConfigured(this.taf.forecasts[0].fromTime);
		}
	}
	
	visibility(): string {
		if(this.taf.forecasts[0] != null && this.taf.forecasts[0].visibility != null){
			return this.conversionService.convertStatueMilesToConfigured(Number(this.taf.forecasts[0].visibility)).measurementAndUnit;
		}
	}

	windSpeed(): string{
		if(this.taf.forecasts[0] != null && this.taf.forecasts[0].windSpeed != null){
			return this.conversionService.convertKnotsToConfigured(Number(this.taf.forecasts[0].windSpeed)).measurementAndUnit;
		}
	}
}

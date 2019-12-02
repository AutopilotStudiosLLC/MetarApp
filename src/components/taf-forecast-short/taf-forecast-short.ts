import {Component, Input} from '@angular/core';
import {ConversionService} from "../../services/conversion.service";
import {Taf} from "../../models/taf.model";
import {tafConversions} from "../../architecture/tafConversions";

@Component({
	selector: 'taf-forecast-short',
	templateUrl: 'taf-forecast-short.html'
})

export class TafForecastShort extends tafConversions {
	@Input() taf: Taf;

	constructor(protected conversionService: ConversionService) {
		super(conversionService);
	 }

	fromTime(): string {
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

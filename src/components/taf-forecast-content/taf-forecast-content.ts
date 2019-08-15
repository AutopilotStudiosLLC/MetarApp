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

	 forecastVisibility(): string {
        if(this.forecast != null && this.forecast.visibility != null){
            return this.conversionService.convertStatueMilesToConfigured(Number(this.forecast.visibility)).measurementAndUnit;
        }
    }

    forecastWindSpeedMeasurement(): string {
		if(this.forecast != null && this.forecast.windSpeed != null){
			return this.conversionService.convertKnotsToConfigured(Number(this.forecast.windSpeed)).measurement;
		}
	}

	forecastWindSpeedUnit(): string {
		if(this.forecast != null && this.forecast.windSpeed != null){
			return this.conversionService.convertKnotsToConfigured(Number(this.forecast.windSpeed)).unit;
		}
    }

    forecastWindGustsMeasurement(): string {
		if(this.forecast != null && this.forecast.windGusts != null){
			return this.conversionService.convertKnotsToConfigured(Number(this.forecast.windGusts)).measurement;
		}
	}

	forecastWindGustsUnit(): string {
		if(this.forecast != null && this.forecast.windGusts != null){
			return this.conversionService.convertKnotsToConfigured(Number(this.forecast.windGusts)).unit;
		}
    }
}

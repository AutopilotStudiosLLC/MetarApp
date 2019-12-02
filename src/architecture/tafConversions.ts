import {Input} from '@angular/core';
import {ConversionService} from "../services/conversion.service"
import { SkyCondition } from '../models/sky-condition.model';
import {Forecast} from "../models/forecast.model";

export abstract class tafConversions{
	@Input() forecast: Forecast;

    constructor(protected conversionService: ConversionService){

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

	forecastFromDay(dateFormat: string = 'MMM D'): string {
		if(this.forecast != null && this.forecast.fromTime != null){
			return this.conversionService.convertTimeToConfiguredCustomFormat(this.forecast.fromTime, dateFormat);
		}
	}

	forecastToDay(dateFormat: string = 'MMM D'): string {
		if(this.forecast != null && this.forecast.toTime != null){
			return this.conversionService.convertTimeToConfiguredCustomFormat(this.forecast.toTime, dateFormat);
		}
	}

    forecastFromTime(dateFormat: string = ''): string {
		if(this.forecast != null && this.forecast.fromTime != null){
			return this.conversionService.convertTimeToConfigured(this.forecast.fromTime, dateFormat);
		}
    }

	forecastToTime(dateFormat: string = ''): string {
		if(this.forecast != null && this.forecast.toTime != null){
			return this.conversionService.convertTimeToConfigured(this.forecast.toTime, dateFormat);
		}
	}
    
    forecastSkyConditions(): string[] {
        let skyConditions: SkyCondition[] = [];
        let returnVal: string[] = [];
        if (this.forecast != null) {
            if(Array.isArray(this.forecast.skyConditions)) {
                skyConditions = this.forecast.skyConditions;
            } else {
                skyConditions = [this.forecast.skyConditions];
            }
        }
        skyConditions.forEach(skyCondition => {
			let conditionString = skyCondition.getSkyConditionString();
            if(skyCondition.cloudBaseAGL > 0) {
				conditionString += ' @ ' + this.conversionService.convertFeetToConfigured(Number(skyCondition.cloudBaseAGL), 0).measurementAndUnit + ' AGL';
            } else if(skyCondition.cloudBaseMSL > 0) {
				conditionString += ' @ ' + this.conversionService.convertFeetToConfigured(Number(skyCondition.cloudBaseMSL), 0).measurementAndUnit + ' MSL';
			}
            returnVal.push(conditionString);
        });
        return returnVal;
    }
}

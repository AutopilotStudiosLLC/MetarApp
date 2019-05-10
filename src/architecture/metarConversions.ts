import {Input} from '@angular/core';
import {Metar} from "../models/metar.model";
import {ConversionService} from "../services/conversion.service"
import { SkyCondition } from '../models/sky-condition.model';

export abstract class MetarConversions{

    constructor(protected conversionService: ConversionService){

    }
    
    @Input() metar: Metar;
    
    metarVisibility(): string{
        if(this.metar != null && this.metar.visibility != null){
            return this.conversionService.convertStatueMilesToConfigured(Number(this.metar.visibility)).measurementAndUnit;
        }
    }

    metarTemperature(): string{
		if(this.metar != null && this.metar.temperature != null){
			return this.conversionService.convertCelciusToConfigured(Number(this.metar.temperature)).measurementAndUnit;
		}
	}

	metarDewpoint(): string{
		if(this.metar != null && this.metar.dewpoint != null){
			return this.conversionService.convertCelciusToConfigured(Number(this.metar.dewpoint)).measurementAndUnit;
		}
	}

	metarWindSpeedMeasurement(): string{
		if(this.metar != null && this.metar.windSpeed != null){
			return this.conversionService.convertKnotsToConfigured(Number(this.metar.windSpeed)).measurement;
		}
	}

	metarWindSpeedUnit(): string{
		if(this.metar != null && this.metar.windSpeed != null){
			return this.conversionService.convertKnotsToConfigured(Number(this.metar.windSpeed)).unit;
		}
    }
    
    metarSkyConditions(): string[]{
        let skyConditions: SkyCondition[] = [];
        let returnVal: string[] = [];
        if (this.metar != null){
            if(Array.isArray(this.metar.skyCondition)) {
                skyConditions = this.metar.skyCondition;
            } else {
                skyConditions = [this.metar.skyCondition];
            }
        }
        skyConditions.forEach(skyCondition => {
            if(skyCondition.cloud_base_ft_agl > 0){
                returnVal.push(
                    skyCondition.getSkyConditionString() +
                    (skyCondition.cloud_base_ft_agl) ? (' @ ' + 
                    this.conversionService.convertFeetToConfigured(Number(skyCondition.cloud_base_ft_agl)).measurementAndUnit + 
                    ' AGL') : null
                );
            }            
        });
        return returnVal;
    }
}
import {Input} from '@angular/core';
import {Metar} from "../models/metar.model";
import {ConversionService} from "../services/conversion.service"
import { SkyCondition } from '../models/sky-condition.model';

export abstract class MetarConversions{

    constructor(protected conversionService: ConversionService){

    }
    
    @Input() metar: Metar;
    
    metarVisibility(): string {
        if(this.metar != null && this.metar.visibility != null){
            return this.conversionService.convertStatueMilesToConfigured(Number(this.metar.visibility)).measurementAndUnit;
        }
    }

    metarTemperature(): string {
		if(this.metar != null && this.metar.temperature != null){
			return this.conversionService.convertCelciusToConfigured(Number(this.metar.temperature)).measurementAndUnit;
		}
	}

	metarDewpoint(): string {
		if(this.metar != null && this.metar.dewpoint != null){
			return this.conversionService.convertCelciusToConfigured(Number(this.metar.dewpoint)).measurementAndUnit;
		}
	}

	metarWindSpeedMeasurement(): string {
		if(this.metar != null && this.metar.windSpeed != null){
			return this.conversionService.convertKnotsToConfigured(Number(this.metar.windSpeed)).measurement;
		}
	}

	metarWindSpeedUnit(): string {
		if(this.metar != null && this.metar.windSpeed != null){
			return this.conversionService.convertKnotsToConfigured(Number(this.metar.windSpeed)).unit;
		}
    }

    metarWindGustsMeasurement(): string {
		if(this.metar != null && this.metar.windGusts != null){
			return this.conversionService.convertKnotsToConfigured(Number(this.metar.windGusts)).measurement;
		}
	}

	metarWindGustsUnit(): string {
		if(this.metar != null && this.metar.windGusts != null){
			return this.conversionService.convertKnotsToConfigured(Number(this.metar.windGusts)).unit;
		}
    }

    metarObservationTime(dateFormat: string = ''): string {
		if(this.metar != null && this.metar.observationTime != null){
			return this.conversionService.convertTimeToConfigured(this.metar.observationTime, dateFormat);
		}
    }

    metarAltimeter(): string {
		if(this.metar != null && this.metar.altimeter != null){
			return this.conversionService.convertInchesMercuryToConfigured(Number(this.metar.altimeter)).measurementAndUnit;
		}
    }

    metarElevation(): string {
		if(this.metar != null && this.metar.elevation != null){
			return this.conversionService.convertMetersToConfigured(Number(this.metar.elevation)).measurementAndUnit;
		}
    }
    
    metarSkyConditions(): string[] {
        let skyConditions: SkyCondition[] = [];
        let returnVal: string[] = [];
        if (this.metar != null) {
            if(Array.isArray(this.metar.skyCondition)) {
                skyConditions = this.metar.skyCondition;
            } else {
                skyConditions = [this.metar.skyCondition];
            }
        }
        skyConditions.forEach(skyCondition => {
			let conditionString = skyCondition.getSkyConditionString();
            if(skyCondition.cloudBaseAGL > 0) {
				conditionString += ' @ ' + this.conversionService.convertFeetToConfigured(Number(skyCondition.cloudBaseAGL)).measurementAndUnit + ' AGL';
            } else if(skyCondition.cloudBaseMSL > 0) {
				conditionString += ' @ ' + this.conversionService.convertFeetToConfigured(Number(skyCondition.cloudBaseMSL)).measurementAndUnit + ' MSL';
			}
            returnVal.push(conditionString);
        });
        return returnVal;
    }
}

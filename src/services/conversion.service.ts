import {Injectable} from "@angular/core";
import {ConfigService} from './config.service';
import {TemperatureUnits} from './config.service';

@Injectable()

export class ConversionService {

    constructor(private configService: ConfigService){

    }

    convertCelciusToConfigured(degreesCelcius: number): ConvertedMeasurement{
        var configuredTempuraturUnit : TemperatureUnits = this.configService.getConfiguredTempuraturUnit();
        if (configuredTempuraturUnit == TemperatureUnits.Celsius)
        {
            var d: string = degreesCelcius.toFixed(1);
            return {measurement: d, unit: configuredTempuraturUnit.toString(), measurementAndUnit: `${d}° C`}
        }
        else
        {
            var fahrenheit = degreesCelcius * 9 / 5 + 32;
            return {measurement: fahrenheit.toFixed(1), unit: configuredTempuraturUnit.toString(), measurementAndUnit: `${fahrenheit.toFixed(1)}° F`}
        }
    }    
}

export interface ConvertedMeasurement
{
    measurement: String;
    unit: String;
    measurementAndUnit: String;
}
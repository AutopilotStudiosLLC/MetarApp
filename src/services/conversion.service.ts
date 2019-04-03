import {Injectable} from "@angular/core";
import {ConfigService} from './config.service';
import {TemperatureUnits} from './config.service';
import {SpeedUnits} from './config.service';
import {DistanceUnits} from './config.service';

@Injectable()

export class ConversionService {

    constructor(private configService: ConfigService){

    }

    convertCelciusToConfigured(degreesCelcius: number): ConvertedMeasurement{
        var configuredTemperatureUnit : TemperatureUnits = this.configService.getConfiguredTemperatureUnit();
        if (configuredTemperatureUnit == TemperatureUnits.Celsius)
        {
            var d: number = Number(degreesCelcius.toFixed(1));
            return {measurement: d.toString(), unit: configuredTemperatureUnit.toString(), measurementAndUnit: `${d}° C`}
        }
        else
        {
            var fahrenheit: number = Number((degreesCelcius * 9 / 5 + 32).toFixed(1));
            return {measurement: fahrenheit.toString(), unit: configuredTemperatureUnit.toString(), measurementAndUnit: `${fahrenheit}° F`}
        }
    }   
    
    convertKnotsToConfigured(knots: number): ConvertedMeasurement{
        var configuredSpeedUnit : SpeedUnits = this.configService.getConfiguredSpeedUnit();
        if (configuredSpeedUnit == SpeedUnits.KTS)
        {
            var s: number = Number(knots.toFixed(1));
            return {measurement: s.toString(), unit: 'kts', measurementAndUnit: `${s} kts`}
        }
        else
        {
            var mph = Number((knots * 1.15077945).toFixed(1));
            return {measurement: mph.toString(), unit: 'mph', measurementAndUnit: `${mph} mph`}
        }
    }    

    convertKilometersToConfigured(km: number): ConvertedMeasurement{
        var configuredDistanceUnit : DistanceUnits = this.configService.getConfiguredDistanceUnit();
        if (configuredDistanceUnit == DistanceUnits.Kilometers)
        {
            var km: number = Number(km.toFixed(1));
            return {measurement: km.toString(), unit: 'km', measurementAndUnit: `${km} km`}
        }
        else if (configuredDistanceUnit == DistanceUnits.StatuteMiles)
        {
            var mi: number = Number((km / 1.609).toFixed(1));
            return {measurement: mi.toString(), unit: 'mi', measurementAndUnit: `${mi} mi`}
        }
        else
        {
            var nm: number = Number((km / 1.852).toFixed(1));
            return {measurement: nm.toString(), unit: 'nm', measurementAndUnit: `${nm} nm`}
        }
    }   
}

export interface ConvertedMeasurement
{
    measurement: String;
    unit: String;
    measurementAndUnit: String;
}
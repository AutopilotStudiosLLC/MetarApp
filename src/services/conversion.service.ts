import {Injectable} from "@angular/core";
import {ConfigService} from './config.service';
import {TemperatureUnits} from './config.service';
import {SpeedUnits} from './config.service';
import {DistanceUnits} from './config.service';
import {AltitudeUnits} from './config.service';

@Injectable()

export class ConversionService {

    constructor(private configService: ConfigService){

    }

    convertCelciusToConfigured(degreesCelcius: number): ConvertedMeasurement{
        var configuredTemperatureUnit : TemperatureUnits = this.configService.getConfiguredTemperatureUnit();
        if (configuredTemperatureUnit == TemperatureUnits.Celsius)
        {
            degreesCelcius = Number(degreesCelcius.toFixed(1));
            return {measurement: degreesCelcius.toString(), unit: configuredTemperatureUnit.toString(), measurementAndUnit: `${degreesCelcius}° C`}
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
            knots = Number(knots.toFixed(1));
            return {measurement: knots.toString(), unit: 'kts', measurementAndUnit: `${knots} kts`}
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
            km = Number(km.toFixed(1));
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

    convertStatueMilesToConfigured(mi: number): ConvertedMeasurement{
        var configuredDistanceUnit : DistanceUnits = this.configService.getConfiguredDistanceUnit();
        if (configuredDistanceUnit == DistanceUnits.StatuteMiles)
        {
            mi = Number(mi.toFixed(1));
            return {measurement: mi.toString(), unit: 'mi', measurementAndUnit: `${mi} mi`}
        }
        else if (configuredDistanceUnit == DistanceUnits.Kilometers)
        {
            var km: number = Number((mi / .62137).toFixed(1));
            return {measurement: km.toString(), unit: 'km', measurementAndUnit: `${km} km`}
        }
        else
        {
            var nm: number = Number((mi / 1.15078).toFixed(1));
            return {measurement: nm.toString(), unit: 'nm', measurementAndUnit: `${nm} nm`}
        }
    }  

    convertFeetToConfigured(ft: number): ConvertedMeasurement{
        var configuredAltitudeUnit : AltitudeUnits = this.configService.getConfiguredAltitudeUnit();
        if (configuredAltitudeUnit == AltitudeUnits.Feet)
        {
            var s: number = Number(ft.toFixed(1));
            return {measurement: s.toString(), unit: 'ft', measurementAndUnit: `${s} ft`}
        }
        else
        {
            var m: number = Number((ft / 3.2808).toFixed(1));
            return {measurement: m.toString(), unit: 'm', measurementAndUnit: `${m} m`}
        }
    }   
}

export interface ConvertedMeasurement
{
    measurement: string;
    unit: string;
    measurementAndUnit: string;
}
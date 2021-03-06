import * as moment from "moment";
import {Injectable} from "@angular/core";
import {
    ConfigService, 
    PressureUnits,
    TemperatureUnits,
    SpeedUnits,
    DistanceUnits,
    AltitudeUnits,
    TimeZone
} from './config.service';

@Injectable()

export class ConversionService {

    constructor(private configService: ConfigService){

    }

    convertCelciusToConfigured(degreesCelcius: number, precision:number = 1): ConvertedMeasurement{
        var configuredTemperatureUnit : TemperatureUnits = this.configService.getConfiguredTemperatureUnit();
        if (configuredTemperatureUnit == TemperatureUnits.Celsius)
        {
            degreesCelcius = Number(degreesCelcius.toFixed(precision));
            return {measurement: degreesCelcius.toString(), unit: configuredTemperatureUnit.toString(), measurementAndUnit: `${degreesCelcius}° C`}
        }
        else
        {
            var fahrenheit: number = Number((degreesCelcius * 9 / 5 + 32).toFixed(precision));
            return {measurement: fahrenheit.toString(), unit: configuredTemperatureUnit.toString(), measurementAndUnit: `${fahrenheit}° F`}
        }
    }   
    
    convertKnotsToConfigured(knots: number, precision: number = 1): ConvertedMeasurement{
        var configuredSpeedUnit : SpeedUnits = this.configService.getConfiguredSpeedUnit();
        if (configuredSpeedUnit == SpeedUnits.KTS)
        {
            knots = Number(knots.toFixed(precision));
            return {measurement: knots.toString(), unit: 'kts', measurementAndUnit: `${knots} kts`}
        }
        else if (configuredSpeedUnit == SpeedUnits.MS)
        {
            var metersSecond = Number((knots * 0.514444).toFixed(precision));
            return {measurement: metersSecond.toString(), unit: 'm/s', measurementAndUnit: `${metersSecond} m/s`}
        }
        else
        {
            var mph = Number((knots * 1.15077945).toFixed(precision));
            return {measurement: mph.toString(), unit: 'mph', measurementAndUnit: `${mph} mph`}
        }
    }

    convertKilometersToConfigured(km: number, precision:number = 1): ConvertedMeasurement{
        var configuredDistanceUnit : DistanceUnits = this.configService.getConfiguredDistanceUnit();
        if (configuredDistanceUnit == DistanceUnits.Kilometers)
        {
            km = Number(km.toFixed(precision));
            return {measurement: km.toString(), unit: 'km', measurementAndUnit: `${km} km`}
        }
        else if (configuredDistanceUnit == DistanceUnits.StatuteMiles)
        {
            var mi: number = Number((km / 1.609).toFixed(precision));
            return {measurement: mi.toString(), unit: 'mi', measurementAndUnit: `${mi} mi`}
        }
        else
        {
            var nm: number = Number((km / 1.852).toFixed(precision));
            return {measurement: nm.toString(), unit: 'nm', measurementAndUnit: `${nm} nm`}
        }
    }   

    convertStatueMilesToConfigured(mi: number, precision: number = 1): ConvertedMeasurement{
        var configuredDistanceUnit : DistanceUnits = this.configService.getConfiguredDistanceUnit();
        if (configuredDistanceUnit == DistanceUnits.StatuteMiles)
        {
            mi = Number(mi.toFixed(precision));
            return {measurement: mi.toString(), unit: 'mi', measurementAndUnit: `${mi} mi`}
        }
        else if (configuredDistanceUnit == DistanceUnits.Kilometers)
        {
            var km: number = Number((mi / .62137).toFixed(precision));
            return {measurement: km.toString(), unit: 'km', measurementAndUnit: `${km} km`}
        }
        else
        {
            var nm: number = Number((mi / 1.15078).toFixed(precision));
            return {measurement: nm.toString(), unit: 'nm', measurementAndUnit: `${nm} nm`}
        }
    }  

    convertFeetToConfigured(ft: number, precision:number = 1): ConvertedMeasurement{
        var configuredAltitudeUnit : AltitudeUnits = this.configService.getConfiguredAltitudeUnit();
        if (configuredAltitudeUnit == AltitudeUnits.Feet)
        {
            ft = Number(ft.toFixed(precision));
            return {measurement: ft.toString(), unit: 'ft', measurementAndUnit: `${ft} ft`}
        }
        else
        {
            var m: number = Number((ft / 3.2808).toFixed(precision));
            return {measurement: m.toString(), unit: 'm', measurementAndUnit: `${m} m`}
        }
    }

    convertMetersToConfigured(m: number, precision:number = 1): ConvertedMeasurement{
        var configuredAltitudeUnit : AltitudeUnits = this.configService.getConfiguredAltitudeUnit();
        if (configuredAltitudeUnit == AltitudeUnits.Feet)
        {
            var ft: number = Number((m * 3.2808).toFixed(precision));
            return {measurement: ft.toString(), unit: 'ft', measurementAndUnit: `${ft} ft`}
        }
        else
        {
            m = Number(m.toFixed(precision));
            return {measurement: m.toString(), unit: 'm', measurementAndUnit: `${m} m`}
        }
    }
    
    convertTimeToConfigured(time: moment.Moment, dateFormat: string = ''): string{
        var configuredTimeZone : TimeZone = this.configService.getConfiguredTimeZone();
        if (configuredTimeZone == TimeZone.Local){
            return time.local().format(dateFormat + 'h:mm A');
        }
        else{
            return `${time.utc().format(dateFormat + 'HH:mm')} Z`;
        }
        
    }

    convertTimeToConfiguredCustomFormat(time: moment.Moment, customFormat: string = ''): string{
        var configuredTimeZone : TimeZone = this.configService.getConfiguredTimeZone();
        if (configuredTimeZone == TimeZone.Local){
            return time.local().format(customFormat);
        }
        else{
            return time.utc().format(customFormat);
        }
        
    }

    convertInchesMercuryToConfigured(pressure: number): ConvertedMeasurement{
        var configuredPressure : PressureUnits = this.configService.getConfiguredPressureUnit();
        if (configuredPressure == PressureUnits.InchesMercury){
            var inhg: number = Number(pressure.toFixed(2));
            return {measurement: inhg.toString(), unit: 'inHg', measurementAndUnit: `${inhg} inHg`};
        }
        else{
            var mb: number = Number((pressure * 33.8639).toFixed(1));
            return {measurement: mb.toString(), unit: 'mb', measurementAndUnit: `${mb} mb`};
        }
        
    }

    sameDay(firstTime: moment.Moment, secondTime: moment.Moment){
        var configuredTimeZone : TimeZone = this.configService.getConfiguredTimeZone();
        if (configuredTimeZone == TimeZone.Local){
            return firstTime.local().format('MMM D') === secondTime.local().format("MMM D");
        }
        else{
            return firstTime.utc().format('MMM D') === secondTime.utc().format("MMM D");
        }        
    }
}

export interface ConvertedMeasurement
{
    measurement: string;
    unit: string;
    measurementAndUnit: string;
}

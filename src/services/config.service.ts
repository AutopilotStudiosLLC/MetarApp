import {Injectable} from "@angular/core";
import {Config} from 'ionic-angular';

@Injectable()
export class ConfigService {

    constructor(private config: Config){

    }

    setConfiguredTemperatureUnit(temperatureUnit: TemperatureUnits){
        this.config.set('TemperatureUnits', temperatureUnit);
    }

    getConfiguredTemperatureUnit(): TemperatureUnits{
        return this.config.get('TemperatureUnits', TemperatureUnits.Celsius);
    }

    setConfiguredSpeedUnit(speedUnit: SpeedUnits){
        this.config.set('SpeedUnits', speedUnit);
    }

    getConfiguredSpeedUnit(): SpeedUnits{
        return this.config.get('SpeedUnits', SpeedUnits.KTS);
    }

    setConfiguredDistanceUnit(distanceUnit: DistanceUnits){
        this.config.set('DistanceUnits', distanceUnit);
    }

    getConfiguredDistanceUnit(): DistanceUnits{
        return this.config.get('DistanceUnits', DistanceUnits.StatuteMiles);
    }

    setConfiguredAltitudeUnit(altitudeUnit: AltitudeUnits){
        this.config.set('AltitudeUnits', altitudeUnit);
    }

    getConfiguredAltitudeUnit(): AltitudeUnits{
        return this.config.get('AltitudeUnits', AltitudeUnits.Feet);
    }

    setConfiguredTimeZone(timeZone: TimeZone){
        this.config.set('TimeZone', timeZone);
    }

    getConfiguredTimeZone(): TimeZone{
        return this.config.get('TimeZone', TimeZone.Local);
    }

    setConfiguredPressureUnit(pressureUnit: PressureUnits){
        this.config.set('PressureUnits', pressureUnit);
    }

    getConfiguredPressureUnit(): PressureUnits{
        return this.config.get('PressureUnits', PressureUnits.InchesMercury);
    }
}

export enum TemperatureUnits{
	Fahrenheit = "Fahrenheit",
	Celsius = "Celsius"
}

export enum SpeedUnits{
	MPH = "Miles Per Hour",
    KTS = "Knots",
    MS = "Meters Per Second"
}

export enum DistanceUnits{
    Kilometers = "Kilometers",
	StatuteMiles = "Statue Miles",
	NauticalMiles = "Nautical Miles"
}

export enum AltitudeUnits{
	Feet = "Feet",
	Meters = "Meters"
}

export enum TimeZone{
    Local = "Local",
    UTC = "UTC"
}

export enum PressureUnits{
    InchesMercury = "Inches of Mercury",
    Millibars = "Millibars"
}
import {Injectable} from "@angular/core";
import {Config} from 'ionic-angular';
import {Storage} from "@ionic/storage";

@Injectable()

export class ConfigService {

    readonly defaultTemperatureUnit: TemperatureUnits = TemperatureUnits.Celsius;
    readonly defaultSpeedUnit: SpeedUnits = SpeedUnits.KTS;
    readonly defaultDistanceUnit: DistanceUnits = DistanceUnits.StatuteMiles;
    readonly defaultAltitudeUnit: AltitudeUnits = AltitudeUnits.Feet;
    readonly defaultTimeZone: TimeZone = TimeZone.Local;
    readonly defaultPressureUnit: PressureUnits = PressureUnits.InchesMercury;
    readonly temperatureKey: string = "TemperatureUnits";
    readonly speedKey: string = "SpeedUnits";
    readonly distanceKey: string = "DistanceUnits";
    readonly altitudeKey: string = "AltitudeUnits";
    readonly timezoneKey: string = "TimeZone";
    readonly pressureKey: string = "PressureUnits";

    constructor(private config: Config, private storage: Storage){
        console.log("Config created");
        this.storage.get(this.temperatureKey).then((value: TemperatureUnits) =>{
            this.setConfiguredTemperatureUnit(value != null ? value : this.defaultTemperatureUnit);
        }).catch();

        this.storage.get(this.speedKey).then((value: SpeedUnits) =>{
            this.setConfiguredSpeedUnit(value != null ? value : this.defaultSpeedUnit);
        }).catch();

        this.storage.get(this.distanceKey).then((value: DistanceUnits) =>{
            this.setConfiguredDistanceUnit(value != null ? value : this.defaultDistanceUnit);
        }).catch();

        this.storage.get(this.altitudeKey).then((value: AltitudeUnits) =>{
            this.setConfiguredAltitudeUnit(value != null ? value : this.defaultAltitudeUnit);
        }).catch();

        this.storage.get(this.timezoneKey).then((value: TimeZone) =>{
            this.setConfiguredTimeZone(value != null ? value : this.defaultTimeZone);
        }).catch();

        this.storage.get(this.pressureKey).then((value: PressureUnits) =>{
            this.setConfiguredPressureUnit(value != null ? value : this.defaultPressureUnit);
        }).catch();        
    }

    setConfiguredTemperatureUnit(temperatureUnit: TemperatureUnits){
        this.config.set(this.temperatureKey, temperatureUnit);
        this.storage.set(this.temperatureKey, temperatureUnit);
    }

    getConfiguredTemperatureUnit(): TemperatureUnits{
        return this.config.get(this.temperatureKey, this.defaultTemperatureUnit);
    }

    setConfiguredSpeedUnit(speedUnit: SpeedUnits){
        this.config.set(this.speedKey, speedUnit);
        this.storage.set(this.speedKey, speedUnit);
    }

    getConfiguredSpeedUnit(): SpeedUnits{
        return this.config.get(this.speedKey, this.defaultSpeedUnit);
    }

    setConfiguredDistanceUnit(distanceUnit: DistanceUnits){
        this.config.set(this.distanceKey, distanceUnit);
        this.storage.set(this.distanceKey, distanceUnit);
    }

    getConfiguredDistanceUnit(): DistanceUnits{
        return this.config.get(this.distanceKey, this.defaultDistanceUnit);
    }

    setConfiguredAltitudeUnit(altitudeUnit: AltitudeUnits){
        this.config.set(this.altitudeKey, altitudeUnit);
        this.storage.set(this.altitudeKey, altitudeUnit);
    }

    getConfiguredAltitudeUnit(): AltitudeUnits{
        return this.config.get(this.altitudeKey, this.defaultAltitudeUnit);
    }

    setConfiguredTimeZone(timeZone: TimeZone){
        this.config.set(this.timezoneKey, timeZone);
        this.storage.set(this.timezoneKey, timeZone);
    }

    getConfiguredTimeZone(): TimeZone{
        return this.config.get(this.timezoneKey, this.defaultTimeZone);
    }

    setConfiguredPressureUnit(pressureUnit: PressureUnits){
        this.config.set(this.pressureKey, pressureUnit);
        this.storage.set(this.pressureKey, pressureUnit);
    }

    getConfiguredPressureUnit(): PressureUnits{
        return this.config.get(this.pressureKey, this.defaultPressureUnit);
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

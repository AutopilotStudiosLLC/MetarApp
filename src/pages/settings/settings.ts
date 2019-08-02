import {Component} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {
	ConfigService, 
	TimeZone, 
	TemperatureUnits, 
	SpeedUnits,
	DistanceUnits, 
	AltitudeUnits, 
	PressureUnits
} from "../../services/config.service";

/**
 * Generated class for the ConfigPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-settings',
	templateUrl: 'settings.html',
})
export class SettingsPage {

	configuredTemperatureUnit: string;
	configuredDistanceUnit: string;
	configuredSpeedUnit: string;
	configuredAltitudeUnit: string;
	configuredTimeZone: string;
	configuredPressureUnit: string;

	constructor(private configService: ConfigService){
		this.configuredTemperatureUnit = configService.getConfiguredTemperatureUnit().toString();
		this.configuredDistanceUnit = configService.getConfiguredDistanceUnit().toString();
		this.configuredSpeedUnit = configService.getConfiguredSpeedUnit().toString();
		this.configuredAltitudeUnit = configService.getConfiguredAltitudeUnit().toString();
		this.configuredTimeZone = configService.getConfiguredTimeZone().toString();
		this.configuredPressureUnit = configService.getConfiguredPressureUnit().toString();
	}

	getTemperatureUnits(){
		return Object.keys(TemperatureUnits);
	}

	onChangeTemperature(){
		if (this.configuredTemperatureUnit == TemperatureUnits.Celsius.toString()){
			this.configService.setConfiguredTemperatureUnit(TemperatureUnits.Celsius);
		}
		else if(this.configuredTemperatureUnit == TemperatureUnits.Fahrenheit.toString()){
			this.configService.setConfiguredTemperatureUnit(TemperatureUnits.Fahrenheit);
		}
		this.configuredTemperatureUnit = this.configService.getConfiguredTemperatureUnit().toString();
	}
	
	getDistanceUnits(){
		return Object.keys(DistanceUnits).map(key => DistanceUnits[key]);
	}

	onChangeDistance(){
		if (this.configuredDistanceUnit == DistanceUnits.Kilometers){
			this.configService.setConfiguredDistanceUnit(DistanceUnits.Kilometers);
		}
		else if (this.configuredDistanceUnit == DistanceUnits.StatuteMiles.toString()){
			this.configService.setConfiguredDistanceUnit(DistanceUnits.StatuteMiles);
		}
		else if (this.configuredDistanceUnit == DistanceUnits.NauticalMiles.toString()){
			this.configService.setConfiguredDistanceUnit(DistanceUnits.NauticalMiles);
		}
		this.configuredDistanceUnit = this.configService.getConfiguredDistanceUnit().toString();
	}

	getSpeedUnits(){
		return Object.keys(SpeedUnits).map(key => SpeedUnits[key]);
	}

	onChangeSpeed(){
		if (this.configuredSpeedUnit == SpeedUnits.KTS.toString()){
			this.configService.setConfiguredSpeedUnit(SpeedUnits.KTS);
		}
		else if(this.configuredSpeedUnit == SpeedUnits.MPH.toString()){
			this.configService.setConfiguredSpeedUnit(SpeedUnits.MPH);
		}
		this.configuredSpeedUnit = this.configService.getConfiguredSpeedUnit().toString();
	}

	getAltitudeUnits(){
		return Object.keys(AltitudeUnits).map(key => AltitudeUnits[key]);
	}

	onChangeAltitude(){
		if (this.configuredAltitudeUnit == AltitudeUnits.Feet.toString()){
			this.configService.setConfiguredAltitudeUnit(AltitudeUnits.Feet);
		}
		else if(this.configuredAltitudeUnit == AltitudeUnits.Meters.toString()){
			this.configService.setConfiguredAltitudeUnit(AltitudeUnits.Meters);
		}
		this.configuredAltitudeUnit = this.configService.getConfiguredAltitudeUnit().toString();
	}

	getTimeZones(){
		return Object.keys(TimeZone).map(key => TimeZone[key]);
	}

	onChangeTimeZone(){
		if (this.configuredTimeZone == TimeZone.Local.toString()){
			this.configService.setConfiguredTimeZone(TimeZone.Local);
		}
		else if (this.configuredTimeZone == TimeZone.UTC.toString()){
			this.configService.setConfiguredTimeZone(TimeZone.UTC);
		}
		this.configuredTimeZone = this.configService.getConfiguredTimeZone().toString();
	}

	getPressureUnits(){
		return Object.keys(PressureUnits).map(key => PressureUnits[key]);
	}

	onChangePressure(){
		if (this.configuredPressureUnit == PressureUnits.InchesMercury.toString()){
			this.configService.setConfiguredPressureUnit(PressureUnits.InchesMercury);
		}
		else if(this.configuredPressureUnit == PressureUnits.Millibars.toString()){
			this.configService.setConfiguredPressureUnit(PressureUnits.Millibars);
		}
		this.configuredPressureUnit = this.configService.getConfiguredPressureUnit().toString();
	}
}
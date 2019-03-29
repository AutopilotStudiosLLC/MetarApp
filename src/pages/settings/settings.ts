import {Component} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {ConfigService} from "../../services/config.service";
import {TemperatureUnits} from "../../services/config.service";
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

	temperatureUnit: string;

	constructor(private configService: ConfigService){
		this.temperatureUnit = configService.getConfiguredTempuraturUnit().toString();
	}

	onToggleTemperature(){
		if (this.temperatureUnit == TemperatureUnits.Celsius){
			this.configService.setConfiguredTempuraturUnit(TemperatureUnits.Fahrenheit);
		}
		else{
			this.configService.setConfiguredTempuraturUnit(TemperatureUnits.Celsius);
		}
		this.temperatureUnit = this.configService.getConfiguredTempuraturUnit().toString();
	}	
}
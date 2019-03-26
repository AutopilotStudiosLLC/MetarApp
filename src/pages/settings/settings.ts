import {Component} from '@angular/core';
import {IonicPage, Config} from 'ionic-angular';

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

	temperatureUnit: boolean;

	constructor(private config: Config){
		this.temperatureUnit = this.useFahrenheit();
	}

	onToggleTemperature(){
		this.config.set('useFahrenheit', !this.useFahrenheit());
		this.temperatureUnit = this.useFahrenheit();
	}

	useFahrenheit(): boolean | undefined {
		return this.config.getBoolean('useFahrenheit', false);
	}

	getTemperatureUnit(): string{
		return this.useFahrenheit() ? "Fahrenheit" : "Celsius";
	}

}

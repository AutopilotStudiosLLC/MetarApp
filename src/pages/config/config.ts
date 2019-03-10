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
	selector: 'page-config',
	templateUrl: 'config.html',
})
export class ConfigPage {

	tempuratureUnit: string;	

	constructor(private config: Config){
		this.tempuratureUnit = this.setTempuratureUnit();
	}

	onToggleTempurature(){
		this.config.set('', 'useFerenheight', !this.useFerenheight())
	}

	useFerenheight(){
		return this.config.getBoolean('useFerenheight', false);
	}

	setTempuratureUnit(): string{
		return this.useFerenheight() ? "Ferenheight" : "Celcius";
	}

}

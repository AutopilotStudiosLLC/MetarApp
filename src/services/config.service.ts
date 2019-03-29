import {Injectable} from "@angular/core";
import {Config} from 'ionic-angular';

@Injectable()
export class ConfigService {

    constructor(private config: Config){

    }

    setConfiguredTempuraturUnit(tempurateUnit: TemperatureUnits){
        this.config.set('TemperatureUnits', tempurateUnit);
    }

    getConfiguredTempuraturUnit(){
        return this.config.get('TemperatureUnits', TemperatureUnits.Celsius);
    }
}

export enum TemperatureUnits{
	Fahrenheit = "Fahrenheit",
	Celsius = "Celsius"
}
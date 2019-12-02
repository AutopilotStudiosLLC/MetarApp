import {Component, Input} from '@angular/core';
import {ConversionService} from "../../services/conversion.service";
import {Forecast} from "../../models/forecast.model";
import {tafConversions} from "../../architecture/tafConversions";

@Component({
	selector: 'taf-forecast-content',
	templateUrl: 'taf-forecast-content.html'
})

export class TafForecastContent extends tafConversions {
	@Input() forecast: Forecast;

	constructor(protected conversionService: ConversionService) {
		super(conversionService);
	 }
}

import {Component, Input} from '@angular/core';
import {Metar} from "../../models/metar.model";
import {Station} from "../../models/station.model";
import {MetarConversions} from "../../architecture/metarConversions";
import {ConversionService} from "../../services/conversion.service";

@Component({
	selector: 'metar-list-item',
	templateUrl: 'metar-list-item.html'
})
export class MetarListItem extends MetarConversions{
	@Input() station: Station;
	@Input() metar: Metar;

	constructor(conversionService: ConversionService) {
		super(conversionService);
	}
}

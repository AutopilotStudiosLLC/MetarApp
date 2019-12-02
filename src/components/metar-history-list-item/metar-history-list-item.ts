import {Component, Input} from '@angular/core';
import {Metar} from "../../models/metar.model";
import {Station} from "../../models/station.model";
import {ConversionService} from "../../services/conversion.service";
import {MetarConversions} from "../../architecture/metarConversions";
import {ConfigService} from "../../services/config.service";

@Component({
	selector: 'metar-history-list-item',
	templateUrl: 'metar-history-list-item.html'
})
export class MetarHistoryListItem extends MetarConversions {
	@Input() station: Station;
	@Input() metar: Metar;

	constructor(protected conversionService: ConversionService, protected configService: ConfigService) {
		super(conversionService, configService);
	}
}

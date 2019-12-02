import {Component, Input} from '@angular/core';
import {Station} from "../../models/station.model";
import {Taf} from "../../models/taf.model";
import {ConversionService} from "../../services/conversion.service";
import {tafConversions} from "../../architecture/tafConversions";

@Component({
	selector: 'taf-list-item',
	templateUrl: 'taf-list-item.html'
})
export class TafListItem extends tafConversions {
	@Input() station: Station;
	@Input() taf: Taf;

	constructor(protected conversionService: ConversionService) {
		super(conversionService);
	}

	tafIssueTime(){
		if(this.taf != null && this.taf.issueTime != null){
			return this.conversionService.convertTimeToConfigured(this.taf.issueTime);
		}
	}

	stationDistance(){
		if(this.station != null && this.station.getDistance()){
			return this.conversionService.convertStatueMilesToConfigured(this.station.getDistanceInStatuteMiles(1)).measurementAndUnit;
		}
	}
}

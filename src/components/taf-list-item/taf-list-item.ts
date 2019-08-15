import {Component, Input} from '@angular/core';
import {Station} from "../../models/station.model";
import {Taf} from "../../models/taf.model";
import {Moment} from "moment";
import {ConversionService} from "../../services/conversion.service";

@Component({
	selector: 'taf-list-item',
	templateUrl: 'taf-list-item.html'
})
export class TafListItem {
	@Input() station: Station;
	@Input() taf: Taf;

	constructor(private conversionService: ConversionService) { }

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

	sameDay(fromTime:Moment, toTime:Moment) {
		return fromTime.local().format('MMM D') === toTime.local().format("MMM D");
	}
}

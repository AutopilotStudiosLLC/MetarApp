import {Component, Input} from '@angular/core';
import {Station} from "../../models/station.model";
import {Taf} from "../../models/taf.model";
import {Moment} from "moment";

@Component({
	selector: 'taf-list-item',
	templateUrl: 'taf-list-item.html'
})
export class TafListItem {
	@Input() station: Station;
	@Input() taf: Taf;

	constructor() { }

	sameDay(fromTime:Moment, toTime:Moment) {
		return fromTime.local().format('MMM D') === toTime.local().format("MMM D");
	}
}

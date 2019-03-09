import {Component, Input} from '@angular/core';
import {Metar} from "../../models/metar.model";
import {Station} from "../../models/station.model";

@Component({
	selector: 'metar-history-list-item',
	templateUrl: 'metar-history-list-item.html'
})
export class MetarHistoryListItem {
	@Input() station: Station;
	@Input() metar: Metar;

	constructor() { }
}

import {Component, Input} from '@angular/core';
import {Metar} from "../../models/metar.model";
import {Station} from "../../models/station.model";

@Component({
	selector: 'metar-list-item',
	templateUrl: 'metar-list-item.html'
})
export class MetarListItem {
	@Input() station: Station;
	@Input() metar: Metar;

	constructor() { }
}

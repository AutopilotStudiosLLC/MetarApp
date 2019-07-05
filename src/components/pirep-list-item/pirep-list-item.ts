import {Component, Input} from '@angular/core';
import {Pirep} from "../../models/pirep.model";

@Component({
	selector: 'pirep-list-item',
	templateUrl: 'pirep-list-item.html'
})
export class PirepListItem {
	@Input() pirep: Pirep;

	constructor() { }
}

import {Component, Input} from '@angular/core';
import {Airsigmet} from "../../models/airsigmet.model";
import {AirsigmetHazard} from "../../models/airsigmet-hazard.model";

@Component({
	selector: 'airsigmet-list-item',
	templateUrl: 'airsigmet-list-item.html'
})
export class AirsigmetListItem {
	@Input() airsigmet: Airsigmet;

	constructor() { }

	getSeverityClassName() {
		switch (this.airsigmet.hazard.severity) {
			case AirsigmetHazard.SEVERITY_NONE:
				return 'severity-blue';
			case AirsigmetHazard.SEVERITY_LT_MOD:
				return 'severity-green';
			case AirsigmetHazard.SEVERITY_MOD:
				return 'severity-blue';
			case AirsigmetHazard.SEVERITY_MOD_SEV:
				return 'severity-yellow';
			case AirsigmetHazard.SEVERITY_SEV:
				return 'severity-red';
			default:
				return 'severity-blue';
		}
	}
}

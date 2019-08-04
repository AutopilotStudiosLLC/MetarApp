import {Component, Input} from '@angular/core';
import {Metar} from "../../models/metar.model";
import {Station} from "../../models/station.model";
import {ConversionService} from "../../services/conversion.service";
import {MetarConversions} from "../../architecture/metarConversions";
import {SkyCondition} from "../../models/sky-condition.model";

@Component({
	selector: 'metar-history-list-item',
	templateUrl: 'metar-history-list-item.html'
})
export class MetarHistoryListItem extends MetarConversions {
	@Input() station: Station;
	@Input() metar: Metar;

	constructor(protected conversionService: ConversionService) {
		super(conversionService);
	 }

	stationDistance(){
		if(this.station != null && this.station.getDistance()){
			return this.conversionService.convertKilometersToConfigured(Number(this.station.getDistanceInKm())).measurementAndUnit;
		}
	}

	metarSkyConditions(): string[] {
		let skyConditions: SkyCondition[] = [];
		let returnVal: string[] = [];
		if (this.metar != null) {
			if(Array.isArray(this.metar.skyCondition)) {
				skyConditions = this.metar.skyCondition;
			} else {
				skyConditions = [this.metar.skyCondition];
			}
		}
		skyConditions.forEach(skyCondition => {
			let conditionString = skyCondition.getSkyConditionString();
			if(skyCondition.cloudBaseAGL > 0) {
				conditionString += ' @ ' + this.conversionService.convertFeetToConfigured(Number(skyCondition.cloudBaseAGL)).measurementAndUnit + ' AGL';
			} else if(skyCondition.cloudBaseMSL > 0) {
				conditionString += ' @ ' + this.conversionService.convertFeetToConfigured(Number(skyCondition.cloudBaseMSL)).measurementAndUnit + ' MSL';
			}
			returnVal.push(conditionString);
		});
		return returnVal;
	}
}

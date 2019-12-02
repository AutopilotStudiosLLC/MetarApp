import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Station} from "../../models/station.model";
import {ConversionService} from "../../services/conversion.service";
import {MetarConversions} from "../../architecture/metarConversions";
import {ConfigService} from "../../services/config.service";

@Component({
	selector: 'station-card',
	templateUrl: 'station-card.html'
})
export class StationCard extends MetarConversions {
	@Input() allowRemoveCard: boolean = true;
	@Input() allowFavoriteCard: boolean = true;
	@Input() station: Station;

	@Output() addToFavorites = new EventEmitter();
	@Output() removeCard = new EventEmitter();
	@Output() addToFlightPlan = new EventEmitter();
	@Output() viewCurrentConditions = new EventEmitter();
	@Output() viewForecastConditions = new EventEmitter();

	constructor(conversionService: ConversionService, protected configService: ConfigService) {
		super(conversionService, configService);
	 }

	onAddToFavorites(station:Station) {
		this.addToFavorites.emit(station);
	}

	onRemoveCard(station:Station) {
		this.removeCard.emit(station);
	}

	onAddToFlightPlan(station:Station) {
		this.addToFlightPlan.emit(station);
	}

	onViewCurrentConditions(station:Station) {
		this.viewCurrentConditions.emit(station);
	}

	onViewForecastConditions(station:Station) {
		this.viewForecastConditions.emit(station);
	}
}

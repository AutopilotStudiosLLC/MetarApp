import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Metar} from "../../models/metar.model";
import {Station} from "../../models/station.model";

@Component({
	selector: 'station-card',
	templateUrl: 'station-card.html'
})
export class StationCard {
	@Input() allowRemoveCard: boolean = true;
	@Input() allowFavoriteCard: boolean = true;
	@Input() station: Station;
	@Input() metar: Metar;

	@Output() addToFavorites = new EventEmitter();
	@Output() removeCard = new EventEmitter();
	@Output() addToFlightPlan = new EventEmitter();
	@Output() viewCurrentConditions = new EventEmitter();
	@Output() viewForecastConditions = new EventEmitter();

	constructor() { }

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

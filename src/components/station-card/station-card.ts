import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Metar} from "../../models/metar.model";
import {Station} from "../../models/station.model";
import {ConversionService} from "../../services/conversion.service"

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

	metarTemperature(){
		if(this.metar != null && this.metar.temperature != null){
			return this.conversionService.convertCelciusToConfigured(Number(this.metar.temperature)).measurementAndUnit;
		}
	}

	metarDewpoint(){
		if(this.metar != null && this.metar.dewpoint != null){
			return this.conversionService.convertCelciusToConfigured(Number(this.metar.dewpoint)).measurementAndUnit;
		}
	}

	constructor(private conversionService: ConversionService) { }

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

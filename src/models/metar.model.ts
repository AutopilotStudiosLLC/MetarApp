import * as moment from 'moment';
import {SkyCondition} from "./sky-condition.model";
import {MetarQualityControl} from "./metar-quality-control.model";

export class Metar {
	public skyCondition: SkyCondition[] = [];

	constructor(
		public raw: string,
		public ident: string,
		public observationTime?: moment.Moment,
		public latitude?: number,
		public longitude?: number,
		public temperature?: number,
		public dewpoint?: number,
		public windDirection?: number,
		public windSpeed?: number,
		public visibility?: number,
		public altimeter?: number,
		public qualityControl?: MetarQualityControl,
		public flightCategory?: string,
		public metarType?: string,
		public elevation?: number)
	{}

	public addSkyConditions(skyConditions) {
		this.skyCondition = [];
		if(Array.isArray(skyConditions)) {
			skyConditions.forEach((element) => {
				this.skyCondition.push(
					new SkyCondition(
						element.sky_cover,
						element.cloud_base_ft_agl
					)
				);
			});
			return this.skyCondition;
		} else {
			this.skyCondition.push(
				new SkyCondition(
					skyConditions.sky_cover,
					skyConditions.cloud_base_ft_agl
				)
			);
		}
	}

	public getSkyConditions() {
		if(Array.isArray(this.skyCondition)) {
			return this.skyCondition;
		} else {
			return [this.skyCondition];
		}
	}

	public getFlightCategoryColor() {
		switch(this.flightCategory) {
			case 'VFR':
				return 'green';
			case 'MVFR':
				return 'blue';
			case 'IFR':
			case 'LIFR':
				return 'red';
		}
	}

	public getWeatherPhenomenon() {
		//@todo Incomplete Function
	}

	public static weatherPhenomenonPhrase(abbreviation: string) {
		switch(abbreviation) {
			case 'BLPY':
				return 'Blowing spray';
			case 'BR':
				return 'Mist';
			case 'DS':
				return 'Dust Storm';
			case 'DU':
				return 'Widespread Dust';
			case 'DZ':
				return 'Drizzle';
			case 'FC':
				return 'Funnel Cloud';
			case '+FC':
				return 'Tornado/Water Spout';
			case 'FG':
				return 'Fog';
			case 'FU':
				return 'Smoke';
			case 'GR':
				return 'Hail';
			case 'GS':
				return 'Small Hail/Snow Pellets';
			case 'HZ':
				return 'Haze';
			case 'IC':
				return 'Ice Crystals';
			case 'PL':
				return 'Ice Pellets';
			case 'PO':
				return 'Dust/Sand Whirls';
			case 'RA':
				return 'Rain';
			case 'SA':
				return 'Sand';
			case 'SG':
				return 'Snow Grains';
			case 'SN':
				return 'Snow';
			case 'SNINCR':
				return 'Snow increasing rapidly';
			case 'SQ':
				return 'Squall';
			case 'SS':
				return 'Sandstorm';
			case 'UP':
				return 'Unknown Precipitation';
			case 'VA':
				return 'Volcanic Ash';
		}
	}
}

import * as moment from "moment";
import {SkyCondition} from "./sky-condition.model";
import {SkyConditionResponse} from "./sky-condition-response.model";

export class Forecast {
	public flightCategory;

	constructor(
		public fromTime: moment.Moment,
		public toTime: moment.Moment,
		public changeIndicator: string,
		public windDirection: number,
		public windSpeed: number,
		public visibility: number,
		public skyConditions: SkyCondition[] = [],
		public windGusts:number = null,
		public wxString: string = null
	) {
	    const ceilingVFR = (skyConditions.filter((c) => c.cloud_base_ft_agl < 3000).length === 0);
		const ceilingMVFR = (skyConditions.filter((c) => c.cloud_base_ft_agl < 3000).length >= 1)
			&& (skyConditions.filter((c) => c.cloud_base_ft_agl < 1000).length === 0);
		const ceilingIFR = (skyConditions.filter((c) => c.cloud_base_ft_agl < 1000).length >= 1)
			&& (skyConditions.filter((c) => c.cloud_base_ft_agl < 500).length === 0);
		const ceilingLIFR = (skyConditions.filter((c) => c.cloud_base_ft_agl < 500).length >= 1);

		if(visibility > 5 && ceilingVFR) {
			this.flightCategory = 'VFR';
		} else if ((visibility <= 5 && visibility >= 3 && !ceilingIFR && !ceilingLIFR) || ceilingMVFR) {
			this.flightCategory = 'MVFR';
		} else if ((visibility < 3 && visibility >= 1 && !ceilingLIFR) || ceilingIFR) {
			this.flightCategory = 'IFR';
		} else if(visibility < 1 || ceilingLIFR) {
			this.flightCategory = 'LIFR';
		}
	}

	public static mapSkyConditions(skyCondition: SkyConditionResponse[] | SkyCondition | null): SkyCondition[] {
		if(Array.isArray(skyCondition))
			return skyCondition.map(sky => new SkyCondition(sky.sky_cover, sky.cloud_base_ft_agl));
		else if(skyCondition)
			return [new SkyCondition(skyCondition.sky_cover, skyCondition.cloud_base_ft_agl)];
		else
			return [];
	}

	public getSkyConditions() {
		return this.skyConditions;
	}

	public getWeatherConditions(): string[] {
		if(this.wxString) {
			const conditions = this.wxString.split(' ');
			return conditions.map((cond) => Forecast.convertWeatherCode(cond));
		}
		return [];
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

	public static convertWeatherCode(code:string) {
		let codeDescription:string = '';

		if(code.substr(0, 1) === '-') {
			codeDescription += 'Light ';
			code = code.substring(1);
		} else if(code.substr(0, 1) === '+') {
			codeDescription += 'Heavy ';
			code = code.substring(1);
		}

		// Check for 2 character qualifiers
		const qualifiers = ['MI', 'BC', 'DR', 'BL', 'SH', 'TS', 'FZ', 'PR', 'VC'];
		qualifiers.forEach((qualifier) => {
			const found = code.search(qualifier);
			if(found >= 0) {
				switch (qualifier) {
					case 'MI':
						codeDescription += 'Shallow ';
						break;
					case 'BC':
						codeDescription += 'Patches ';
						break;
					case 'DR':
						codeDescription += 'Low Drifting ';
						break;
					case 'BL':
						codeDescription += 'Blowing ';
						break;
					case 'SH':
						codeDescription += 'Showers ';
						break;
					case 'TS':
						codeDescription += 'Thunderstorm ';
						break;
					case 'FZ':
						codeDescription += 'Freezing ';
						break;
					case 'PR':
						codeDescription += 'Partial ';
						break;
					case 'VC':
						codeDescription += 'Vicinity ';
						break;
				}
			}
		});

		const conditions = [
			// Precipitation
			'DZ','RA', 'SN', 'SG', 'IC', 'PL', 'GR', 'GS', 'UP',
			// Obscuration
			'BR', 'FG', 'FU', 'DU', 'SA', 'HZ', 'PY', 'VA',
			// Other
			'PO', 'SQ', 'FC', 'SS', 'DS'
		];
		conditions.forEach((qualifier) => {
			const found = code.search(qualifier);
			if (found >= 0) {
				switch (qualifier) {
					/* Precipitation */

					case 'DZ':
						codeDescription += 'Drizzle';
						break;
					case 'RA':
						codeDescription += 'Rain';
						break;
					case 'SN':
						codeDescription += 'Snow';
						break;
					case 'SG':
						codeDescription += 'Snow Grains';
						break;
					case 'IC':
						codeDescription += 'Ice Crystals';
						break;
					case 'PL':
						codeDescription += 'Ice Pellets';
						break;
					case 'GR':
						codeDescription += 'Hail';
						break;
					case 'GS':
						codeDescription += 'Small Hail / Snow Pellets';
						break;
					case 'UP':
						codeDescription += 'Unknown Precipitation';
						break;

					/* Obscuration */

					case 'BR':
						codeDescription += 'Mist';
						break;
					case 'FG':
						codeDescription += 'Fog';
						break;
					case 'FU':
						codeDescription += 'Smoke';
						break;
					case 'DU':
						codeDescription += 'Dust';
						break;
					case 'SA':
						codeDescription += 'Sand';
						break;
					case 'HZ':
						codeDescription += 'Haze';
						break;
					case 'PY':
						codeDescription += 'Spray';
						break;
					case 'VA':
						codeDescription += 'Volcanic Ash';
						break;

					/* Other */

					case 'PO':
						codeDescription += 'Dust/Sand Whirls';
						break;
					case 'SQ':
						codeDescription += 'Squalls';
						break;
					case 'FC':
						codeDescription += 'Funnel Cloud, Tornado or Waterspout';
						break;
					case 'SS':
						codeDescription += 'Sandstorm';
						break;
					case 'DS':
						codeDescription += 'Duststorm';
						break;
				}
			}
		});
		return codeDescription;
	}
}

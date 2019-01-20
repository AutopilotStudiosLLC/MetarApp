import * as moment from 'moment';
import {SkyCondition} from "./sky-condition.model";
import {MetarQualityControl} from "./metar-quality-control.model";

export class Metar {
	static readonly WEATHER_LIGHT = '-';
	static readonly WEATHER_HEAVY = '+';
	static readonly WEATHER_BLOWING_SPRAY = 'BLPY';
	static readonly WEATHER_BLOWING_SNOW = 'BLSN';
	static readonly WEATHER_MIST = 'BR';
	static readonly WEATHER_DUST_STORM = 'DS';
	static readonly WEATHER_WIDESPREAD_DUST = 'DU';
	static readonly WEATHER_DRIZZLE = 'DZ';
	static readonly WEATHER_FUNNEL_CLOUD = 'FC';
	static readonly WEATHER_TORNADO_WATER_SPOUT = '+FC';
	static readonly WEATHER_FOG = 'FG';
	static readonly WEATHER_SMOKE = 'FU';
	static readonly WEATHER_HAIL = 'GR';
	static readonly WEATHER_SMALL_HAIL_SNOW_PELLETS = 'GS';
	static readonly WEATHER_HAZE = 'HZ';
	static readonly WEATHER_ICE_CRYSTALS = 'IC';
	static readonly WEATHER_ICE_PELLETS = 'PL';
	static readonly WEATHER_PRESSURE_RISING_RAPIDLY = 'PRESRR';
	static readonly WEATHER_PRESSURE_FALLING_RAPIDLY = 'PRESFR';
	static readonly WEATHER_DUST_SAND_WHIRLS = 'PO';
	static readonly WEATHER_RAIN = 'RA';
	static readonly WEATHER_SAND = 'SA';
	static readonly WEATHER_SNOW_GRAINS = 'SG';
	static readonly WEATHER_SNOW = 'SN';
	static readonly WEATHER_SNOW_INCREASING_RAPIDLY = 'SNINCR';
	static readonly WEATHER_SQUALL = 'SQ';
	static readonly WEATHER_SANDSTORM = 'SS';
	static readonly WEATHER_UNKNOWN_PRECIPITATION = 'UP';
	static readonly WEATHER_VOLCANIC_ASH = 'VA';
	static readonly WEATHER_VARIABLE_VISIBILITY = 'VRB VIS';

	public skyCondition: SkyCondition[] = [];
	private observationTimeString: string = null;
	public windGusts: number = null;
	public weatherConditions: string[] = [];

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

	public processWeatherPhenomenon(): string[] {
		const metarSplit = this.raw.split(' ');
		let weatherConditionArray = [];

		metarSplit.forEach((el) => {
			let phrase = Metar.weatherPhenomenonPhrase(el.toUpperCase());
			if(phrase !== null) {
				weatherConditionArray.push(phrase);
				this.weatherConditions.push(el);
			}
		});

		return weatherConditionArray;
	}
	public getWeatherConditions(): string[] {
		let conditions = [];

		this.weatherConditions.forEach((el) =>
			conditions.push(Metar.weatherPhenomenonPhrase(el))
		);

		return conditions;
	}


	public getImportantVisibilityConditions(): string[] {
		let conditions = [];

		this.weatherConditions.forEach((el) => {
			switch (el) {
				case Metar.WEATHER_MIST:
				case Metar.WEATHER_FOG:
				case Metar.WEATHER_SMOKE:
				case Metar.WEATHER_HAZE:
				case Metar.WEATHER_DUST_STORM:
				case Metar.WEATHER_SANDSTORM:
				case Metar.WEATHER_VARIABLE_VISIBILITY:
					conditions.push(Metar.weatherPhenomenonPhrase(el));
					break;
			}
		});

		return conditions;
	}

	public static weatherPhenomenonPhrase(abbreviation: string) {
		switch(abbreviation) {
			case Metar.WEATHER_BLOWING_SPRAY:
				return 'Blowing Spray';
			case Metar.WEATHER_BLOWING_SNOW:
				return 'Blowing Snow';
			case Metar.WEATHER_MIST:
				return 'Mist';
			case Metar.WEATHER_DUST_STORM:
				return 'Dust Storm';
			case Metar.WEATHER_WIDESPREAD_DUST:
				return 'Widespread Dust';
			case Metar.WEATHER_DRIZZLE:
				return 'Drizzle';
			case Metar.WEATHER_FUNNEL_CLOUD:
				return 'Funnel Cloud';
			case Metar.WEATHER_TORNADO_WATER_SPOUT:
				return 'Tornado/Water Spout';
			case Metar.WEATHER_FOG:
				return 'Fog';
			case Metar.WEATHER_SMOKE:
				return 'Smoke';
			case Metar.WEATHER_HAIL:
				return 'Hail';
			case Metar.WEATHER_SMALL_HAIL_SNOW_PELLETS:
				return 'Small Hail/Snow Pellets';
			case Metar.WEATHER_HAZE:
				return 'Haze';
			case Metar.WEATHER_ICE_CRYSTALS:
				return 'Ice Crystals';
			case Metar.WEATHER_ICE_PELLETS:
				return 'Ice Pellets';
			case Metar.WEATHER_PRESSURE_RISING_RAPIDLY:
				return 'Pressure Rising Rapidly';
			case Metar.WEATHER_PRESSURE_FALLING_RAPIDLY:
				return 'Presure Falling Rapidly';
			case Metar.WEATHER_DUST_SAND_WHIRLS:
				return 'Dust/Sand Whirls';
			case Metar.WEATHER_LIGHT + Metar.WEATHER_RAIN:
				return 'Light Rain';
			case Metar.WEATHER_HEAVY + Metar.WEATHER_RAIN:
				return 'Heavy Rain';
			case Metar.WEATHER_RAIN:
				return 'Rain';
			case Metar.WEATHER_SAND:
				return 'Sand';
			case Metar.WEATHER_SNOW_GRAINS:
				return 'Snow Grains';
			case Metar.WEATHER_LIGHT + Metar.WEATHER_SNOW:
				return 'Light Snow';
			case Metar.WEATHER_HEAVY + Metar.WEATHER_SNOW:
				return 'Heavy Snow';
			case Metar.WEATHER_SNOW:
				return 'Snow';
			case Metar.WEATHER_SNOW_INCREASING_RAPIDLY:
				return 'Snow increasing rapidly';
			case Metar.WEATHER_SQUALL:
				return 'Squall';
			case Metar.WEATHER_SANDSTORM:
				return 'Sandstorm';
			case Metar.WEATHER_UNKNOWN_PRECIPITATION:
				return 'Unknown Precipitation';
			case Metar.WEATHER_VOLCANIC_ASH:
				return 'Volcanic Ash';
			case Metar.WEATHER_VARIABLE_VISIBILITY:
				return 'Variable Visibility';
			default:
				return null;
		}
	}

	public getObservationTimeFromNow(): number {
		return Math.abs(this.observationTime.diff(moment(), 'minutes'));
	}

	public getObservationTimeColor(): string {
		const difference = Math.abs(this.observationTime.diff(moment(), 'minutes'));

		if(difference < 15) {
			return 'observation-recent';
		} else if (difference >= 15 && difference < 40) {
			return 'observation-aging';
		} else {
			return 'observation-outdated';
		}
	}

	public sleep() {
		this.observationTimeString = this.observationTime.format();
		this.observationTime = null;
	}

	public wakeup() {
		this.observationTime = moment(this.observationTimeString);
	}
}

import * as moment from 'moment';

export class Metar {
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
		public autonomousStation?: boolean,
		public skyCondition?: string,
		public flightCategory?: string,
		public metarType?: string,
		public elevation?: number)
	{}

	static parseXMLToMetar(xml: string) {
		let parser = new DOMParser();
		const xmlDoc = parser.parseFromString(xml, 'text/xml');
		const raw = this.getXMLValue(xmlDoc.getElementsByTagName('raw_text'));
		const ident = this.getXMLValue(xmlDoc.getElementsByTagName('station_id'));
		const observationTime = moment.utc(this.getXMLValue(xmlDoc.getElementsByTagName('observation_time')));
		const latitude = parseFloat(this.getXMLValue(xmlDoc.getElementsByTagName('latitude')));
		const longitude = parseFloat(this.getXMLValue(xmlDoc.getElementsByTagName('longitude')));
		const temperature = parseFloat(this.getXMLValue(xmlDoc.getElementsByTagName('temp_c')));
		const dewpoint = parseFloat(this.getXMLValue(xmlDoc.getElementsByTagName('dewpoint_c')));
		const windDirection = parseInt(this.getXMLValue(xmlDoc.getElementsByTagName('wind_dir_degrees')));
		const windSpeed = parseFloat(this.getXMLValue(xmlDoc.getElementsByTagName('wind_speed_kt')));
		const visibility = parseInt(this.getXMLValue(xmlDoc.getElementsByTagName('visibility_statute_mi')));
		const altimeter = parseFloat(this.getXMLValue(xmlDoc.getElementsByTagName('altim_in_hg')));
		const autonomousStation = this.getXMLValue(xmlDoc.getElementsByTagName('auto')) === 'true' ? true : false;
		const skyCondition = this.parseSkyCondition(xmlDoc.getElementsByTagName('sky_condition'));
		const flightCategory = this.getXMLValue(xmlDoc.getElementsByTagName('flight_category'));
		const metarType = this.getXMLValue(xmlDoc.getElementsByTagName('metar_type'));
		const elevation = parseInt(this.getXMLValue(xmlDoc.getElementsByTagName('elevation_m')));

		return new Metar(raw,
			ident,
			observationTime,
			latitude,
			longitude,
			temperature,
			dewpoint,
			windDirection,
			windSpeed,
			visibility,
			altimeter,
			autonomousStation,
			//skyCondition,
			null,
			flightCategory,
			metarType,
			elevation
		);
	}

	static getXMLValue(tag) {
		if(tag)
			if(tag[0])
				if (tag[0].childNodes[0].nodeValue)
					return tag[0].childNodes[0].nodeValue
				else
					return null;
	}

	static parseSkyCondition(skyNodes) {
		console.log(skyNodes);
	}
}

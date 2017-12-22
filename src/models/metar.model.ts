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
		let metars: Metar[] = [];
		let parser = new DOMParser();
		const xmlDoc = parser.parseFromString(xml, 'text/xml');
		let metarsXML = xmlDoc.getElementsByTagName('METAR');
		for(let x = 0; x < metarsXML.length; x++) {
			const raw = this.getXMLValue(metarsXML[x].getElementsByTagName('raw_text'));
			const ident = this.getXMLValue(metarsXML[x].getElementsByTagName('station_id'));
			const observationTime = moment.utc(this.getXMLValue(metarsXML[x].getElementsByTagName('observation_time')));
			const latitude = parseFloat(this.getXMLValue(metarsXML[x].getElementsByTagName('latitude')));
			const longitude = parseFloat(this.getXMLValue(metarsXML[x].getElementsByTagName('longitude')));
			const temperature = parseFloat(this.getXMLValue(metarsXML[x].getElementsByTagName('temp_c')));
			const dewpoint = parseFloat(this.getXMLValue(metarsXML[x].getElementsByTagName('dewpoint_c')));
			const windDirection = parseInt(this.getXMLValue(metarsXML[x].getElementsByTagName('wind_dir_degrees')));
			const windSpeed = parseFloat(this.getXMLValue(metarsXML[x].getElementsByTagName('wind_speed_kt')));
			const visibility = parseInt(this.getXMLValue(metarsXML[x].getElementsByTagName('visibility_statute_mi')));
			const altimeter = parseFloat(this.getXMLValue(metarsXML[x].getElementsByTagName('altim_in_hg')));
			const autonomousStation = this.getXMLValue(metarsXML[x].getElementsByTagName('auto')) === 'true' ? true : false;
			const skyCondition = this.parseSkyCondition(metarsXML[x].getElementsByTagName('sky_condition'));
			const flightCategory = this.getXMLValue(metarsXML[x].getElementsByTagName('flight_category'));
			const metarType = this.getXMLValue(metarsXML[x].getElementsByTagName('metar_type'));
			const elevation = parseInt(this.getXMLValue(metarsXML[x].getElementsByTagName('elevation_m')));

			let metar = new Metar(raw,
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

			metars.push(metar);
		}

		return metars;
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

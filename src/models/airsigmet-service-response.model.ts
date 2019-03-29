import * as moment from 'moment';

export class Airsigmet {
	constructor(
		raw: string,
		valid_time_from: moment.Moment,
		valid_time_to: moment.Moment,
		altitude_range: AirsigmetAltitudeRange,
		hazard_type:string,
		severity: string,
		type: string,
		area: AirsigmetBoundaryArea
	) {}
}


export class AirsigmetAltitudeRange{
	constructor(
		minimumAltitude: number,
		maximumAltitude: number
	) {}
}

export class AirsigmetBoundaryArea {
	constructor(
		points: AirsigmetBoundaryPoint[]
	) {}
}

export class AirsigmetBoundaryPoint {
	constructor(
		latitude: number,
		longitude: number
	) {}
}

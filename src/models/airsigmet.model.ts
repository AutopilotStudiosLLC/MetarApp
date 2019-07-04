import * as moment from 'moment';

export class Airsigmet {
	constructor(
		raw: string,
		validFrom: moment.Moment,
		validTo: moment.Moment,
		altitudeRange: AirsigmetAltitudeRange,
		hazardType:string,
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

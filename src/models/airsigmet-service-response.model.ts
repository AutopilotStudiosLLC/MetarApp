export class AirsigmetServiceResponse {
	constructor(
		public AIRSIGMET: AirsigmetResponse[],
		public results:number
	) {}
}

export class AirsigmetResponse {
	constructor(
		public raw_text: string,
		public valid_time_from: string,
		public valid_time_to: string,
		public altitude: AirsigmetAltitudeResponse | undefined,
		public movement_dir_degrees: string,
		public movement_speed_kt: string,
		public hazard: AirsigmetHazardResponse,
		public airsigmet_type: string,
		public area: AirsigmetBoundaryAreaResponse
	) {}
}


export class AirsigmetAltitudeResponse {
	constructor(
		public max_ft_msl: string,
		public min_ft_msl: string
	) {}
}

export class AirsigmetHazardResponse {
	constructor(
		public type: string,
		public severity: string
	) {}
}

export class AirsigmetBoundaryAreaResponse {
	constructor(
		public points: AirsigmetBoundaryPointResponse[]
	) {}
}

export class AirsigmetBoundaryPointResponse {
	constructor(
		public latitude: string,
		public longitude: string
	) {}
}

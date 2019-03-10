import {SkyConditionResponse} from "./sky-condition-response.model";

export class PirepServiceResponse {
	constructor(
		receipt_time: string,
		observation_time: string,
		quality_control_flags: PirepQualityControlResponse,
		aircraft_ref: string,
		latitude: number,
		longitude: number,
		sky_condition: SkyConditionResponse,
		temp_c: number,
		wind_dir_degrees: number,
		wind_speed_kt: number,
		report_type: string,
		raw_text: string
	) {}
}

class PirepQualityControlResponse {
	constructor(
		bad_location: string
	) {}
}

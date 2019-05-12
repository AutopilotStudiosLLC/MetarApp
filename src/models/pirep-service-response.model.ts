import {SkyConditionResponse} from "./sky-condition-response.model";
import {QualityControlResponse} from "./quality-control-response";
import {IcingConditionResponse} from "./icing-condition-response";
import {TurbulenceConditionResponse} from "./turbulence-condition-response";

export class PirepServiceResponse {
	constructor(
		public results: number,
		public AircraftReport: PirepJsonResponse[]
	)
	{}
}

export class PirepJsonResponse {
	constructor(
		public aircraft_ref: string,
		public altitude_ft_msl: number,
		public latitude: number,
		public longitude: number,
		public observation_time: string,
		public quality_control_flags: QualityControlResponse,
		public raw_text: string,
		public receipt_time: string,
		public report_type: string,
		public temp_c: number,
		public wx_string: string,
		public turbulence_condition: TurbulenceConditionResponse[] = [],
		public icing_condition: IcingConditionResponse[] = [],
		public sky_condition: SkyConditionResponse[] = []
	) {}
}

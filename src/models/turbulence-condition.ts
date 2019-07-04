import {TurbulenceConditionResponse} from "./turbulence-condition-response";

export class TurbulenceCondition {
	constructor(
		public base: number,
		public frequency: string,
		public intensity: string,
		public top: number,
		public type: string
	) {}

	public getIntensityPhrase() {
		switch (this.intensity) {
			case 'LGT':
				return 'Light';
			case 'LGT-MOD':
				return 'Light to Moderate';
			case 'MOD':
				return 'Moderate';
			default:
				return null;

		}
	}

	public static MapTurbulenceConditions(turbulence: TurbulenceConditionResponse[] | TurbulenceConditionResponse | null): TurbulenceCondition[] {
		let turbulenceConditions: TurbulenceCondition[] = [];
		if(Array.isArray(turbulence)) {
			turbulence.forEach((element) => {
				let condition = new TurbulenceCondition(
					element.turbulence_base_ft_msl,
					element.turbulence_freq,
					element.turbulence_intensity,
					element.turbulence_top_ft_msl,
					element.turbulence_type
				);
				turbulenceConditions.push(condition);
			});
		} else if(turbulence) {
			let condition = new TurbulenceCondition(
				turbulence.turbulence_base_ft_msl,
				turbulence.turbulence_freq,
				turbulence.turbulence_intensity,
				turbulence.turbulence_top_ft_msl,
				turbulence.turbulence_type
			);
			turbulenceConditions.push(condition);
		}
		return turbulenceConditions;
	}
}

export class TurbulenceConditionResponse {
	constructor(
		public turbulence_base_ft_msl: number,
		public turbulence_freq: string,
		public turbulence_intensity: string,
		public turbulence_top_ft_msl: number,
		public turbulence_type: string
	) {}
}

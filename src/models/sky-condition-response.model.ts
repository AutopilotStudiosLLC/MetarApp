export class SkyConditionResponse {
	constructor(
		public sky_cover?: string,
		public cloud_base_ft_agl?: string,
		public cloud_base_ft_msl?: string
	) {}
}

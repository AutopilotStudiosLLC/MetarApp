export class IcingConditionResponse {
	constructor(
		public icing_base_ft_msl: number,
		public icing_intensity: string,
		public icing_top_ft_msl: number,
		public icing_type: string
	) {}
}

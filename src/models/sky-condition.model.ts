export class SkyCondition {
	constructor(
		public sky_cover?: string,
		public cloud_base_ft_agl?: number
	) {}

	public getSkyConditionString():string {
		return (this.sky_cover) ? SkyCondition.getSkyConditionPhrase(this.sky_cover) : null;		
	}

	public static getSkyConditionPhrase(cover): string {
		switch (cover) {
			case 'CLR':
				return 'Clear';
			case 'SKC':
				return 'Sky Clear';
			case 'FEW':
				return 'Few';
			case 'SCT':
				return 'Scattered';
			case 'BKN':
				return 'Broken';
			case 'OVC':
				return 'Overcast';
			case 'OVX':
				return 'Sky Obscured';
			default:
				return 'Missing';
		}

	}
}

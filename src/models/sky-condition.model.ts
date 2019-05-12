import {SkyConditionResponse} from "./sky-condition-response.model";

export class SkyCondition {
	constructor(
		public skyCover?: string,
		public cloudBaseAGL?: number,
		public cloudBaseMSL?: number
	) {}

	public getSkyConditionString():string {
		return (this.skyCover) ? SkyCondition.getSkyConditionPhrase(this.skyCover) : null;
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

	public static MapSkyConditions(skyCondition: SkyConditionResponse[] | SkyConditionResponse | null): SkyCondition[] {
		if(Array.isArray(skyCondition))
			return skyCondition.map(sky => {
				let condition = new SkyCondition(sky.sky_cover);
				if(sky.cloud_base_ft_agl)
					condition.cloudBaseAGL = parseInt(sky.cloud_base_ft_agl);
				if(sky.cloud_base_ft_msl)
					condition.cloudBaseMSL = parseInt(sky.cloud_base_ft_msl);
				return condition;
			});
		else if(skyCondition) {
			let condition = new SkyCondition(skyCondition.sky_cover);
			if (skyCondition.cloud_base_ft_agl)
				condition.cloudBaseAGL = parseInt(skyCondition.cloud_base_ft_agl);
			if (skyCondition.cloud_base_ft_msl)
				condition.cloudBaseMSL = parseInt(skyCondition.cloud_base_ft_msl);
			return [condition];
		} else {
			return [];
		}
	}
}

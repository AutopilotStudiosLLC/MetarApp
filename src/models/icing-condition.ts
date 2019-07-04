import {IcingConditionResponse} from "./icing-condition-response";

export class IcingCondition {
	constructor(
		public base: number,
		public intensity: string,
		public top: number,
		public type: string
	) {}

	public static getIcingTypePhrase(type): string {
		switch (type) {
			case 'RIME':
				return 'Rime';
		}
	}

	public static getIcingIntensityPhrase(intensity): string {
		switch (intensity) {
			case 'LGT':
				return 'Light';
			case 'MOD':
				return 'Moderate';
		}
	}

	public static MapIcingConditions(icing: IcingConditionResponse[] | IcingConditionResponse): IcingCondition[] {
		let icingConditions: IcingCondition[] = [];
		if(Array.isArray(icing)) {
			icing.forEach((element) => {
				let condition = new IcingCondition(
					element.icing_base_ft_msl,
					element.icing_intensity,
					element.icing_top_ft_msl,
					element.icing_type
				);
				icingConditions.push(condition);
			});
		} else {
			let condition = new IcingCondition(
				icing.icing_base_ft_msl,
				icing.icing_intensity,
				icing.icing_top_ft_msl,
				icing.icing_type
			);
			icingConditions.push(condition);
		}
		return icingConditions;
	}
}

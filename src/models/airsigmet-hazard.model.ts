export class AirsigmetHazard {
	public static readonly HAZARD_MTN_OBSCN = "MTN OBSCN";
	public static readonly HAZARD_IFR = "IFR";
	public static readonly HAZARD_TURB = "TURB";
	public static readonly HAZARD_ICE = "ICE";
	public static readonly HAZARD_CONVECTIVE = "CONVECTIVE";
	public static readonly HAZARD_ASH = "ASH";

	public static readonly SEVERITY_NONE = "NONE";
	public static readonly SEVERITY_LT_MOD = "LT-MOD";
	public static readonly SEVERITY_MOD = "MOD";
	public static readonly SEVERITY_MOD_SEV = "MOD-SEV";
	public static readonly SEVERITY_SEV = "SEV";

	constructor(
		public type: string,
		public severity: string
	) {}

	public getTypePhrase() {
		switch(this.type) {
			case AirsigmetHazard.HAZARD_ASH:
				return 'Volcanic Ash';
			case AirsigmetHazard.HAZARD_CONVECTIVE:
				return 'Convective';
			case AirsigmetHazard.HAZARD_ICE:
				return 'Icing';
			case AirsigmetHazard.HAZARD_IFR:
				return "IFR";
			case AirsigmetHazard.HAZARD_MTN_OBSCN:
				return 'Mountain Obscuration';
			case AirsigmetHazard.HAZARD_TURB:
				return 'Turbulence';
			default:
				return 'Unknown';
		}
	}

	public getSeverityPhrase() {
		switch(this.severity) {
			case AirsigmetHazard.SEVERITY_NONE:
				return 'None';
			case AirsigmetHazard.SEVERITY_LT_MOD:
				return 'Light to Moderate';
			case AirsigmetHazard.SEVERITY_MOD:
				return 'Moderate';
			case AirsigmetHazard.SEVERITY_MOD_SEV:
				return 'Moderate to Severe';
			case AirsigmetHazard.SEVERITY_SEV:
				return 'Severe';
			default:
				return 'Unknown';
		}
	}
}

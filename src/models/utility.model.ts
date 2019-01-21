export class Utility {
	public static toFahrenheit(celcius) {
		return (celcius * (9/5) + 32).toFixed(1);
	}

	public static metersToFeet(meters) {
		return (meters * 3.28).toFixed(0)
	}

	public static kilometersToNauticalMiles(kilometers: number): number {
		return kilometers * 0.539957;
	}

	public static kilometersToStatuteMiles(kilometers: number): number {
		return kilometers * 0.62137119;
	}
}

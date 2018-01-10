export class Utility {
	public static toFahrenheit(celcius) {
		return (celcius * (9/5) + 32).toFixed(1);
	}

	public static metersToFeet(meters) {
		return (meters * 3.28).toFixed(0)
	}
}

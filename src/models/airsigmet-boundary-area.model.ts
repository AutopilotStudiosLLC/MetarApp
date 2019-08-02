import {AirsigmetBoundaryAreaResponse} from "./airsigmet-service-response.model";

export class AirsigmetBoundaryArea {
	constructor(
		public points: AirsigmetBoundaryPoint[]
	) {}

	public static MapAirsigmetAreaResponse(area: AirsigmetBoundaryAreaResponse): AirsigmetBoundaryArea {
		let points: AirsigmetBoundaryPoint[] = [];
		if(Array.isArray(area.points)) {
			area.points.forEach((element) => {
				let point = new AirsigmetBoundaryPoint(
					parseFloat(element.latitude),
					parseFloat(element.longitude)
				);
				points.push(point);
			});
		}
		return new AirsigmetBoundaryArea(points);
	}
}

export class AirsigmetBoundaryPoint {
	constructor(
		public latitude: number,
		public longitude: number
	) {}
}

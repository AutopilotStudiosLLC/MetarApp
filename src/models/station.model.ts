import {Metar} from "./metar.model";
import {Taf} from "./taf.model";

export class Station {
	private latestMetar: Metar;
	private latestTaf: Taf;
	private distance: number;

	constructor(
		public ident?: string,
		private metars: Metar[] = [],
		private tafs: Taf[] = [],
		public latitude?:number,
		public longitude?:number,
		public elevation?:number,
		public name?:string,
		public state?:string,
		public country?:string,
		public isMetarSupported: boolean = false,
		public isTafSupported: boolean = false
		)
	{
		if(metars.length > 0) this.isMetarSupported = true;
		if(tafs.length > 0) this.isTafSupported = true;
	}

	public static create() {

	}

	public addMetar(metar: Metar) {
		if(metar.ident == this.ident) {
			let found = this.metars.find((element) => {
				return element.observationTime.isSame(metar.observationTime);
			});
			if(!found)
				return this.metars.push(metar);
		}
		return false;
	}

	public addMetarArray(metars: Metar[]) {
		metars.forEach((metar) => {
			if(metar.ident == this.ident) {
				let found = this.metars.find((element) => {
						return element.observationTime.isSame(metar.observationTime);
					});
				if(!found)
					this.metars.push(metar);
			}
		})
	}

	public setMetars(metars: Metar[]) {
		this.metars = metars;
	}

	public removeMetar(metar: Metar) {
		let index = this.metars.findIndex((el) => el === metar);
		this.metars.splice(index, 1);
	}

	public clearMetars() {
		this.metars = [];
	}

	public getLatestMetar(): Metar
	{
		if(this.latestMetar)
			return this.latestMetar;

		const latest = this.metars.reduce((time, el) =>
			el.observationTime >= time.observationTime ? el.observationTime : time, this.metars[0]);

		this.latestMetar = this.metars.find(
			(element) => (element.observationTime == latest)
		);

		return this.latestMetar;
	}

	public getMetars(): Metar[] {
		return this.metars.slice();
	}

	public addTaf(taf: Taf) {
		if(taf.ident == this.ident) {
			let found = this.tafs.find((element) => {
				return element.issueTime.isSame(taf.issueTime);
			});
			if(!found)
				return this.tafs.push(taf);
		}
		return false;
	}

	public addTafArray(tafs: Taf[]) {
		tafs.forEach((taf) => {
			if(taf.ident == this.ident) {
				let found = this.tafs.find((element) => {
					return element.issueTime.isSame(taf.issueTime);
				});
				if(!found)
					this.tafs.push(taf);
			}
		})
	}

	public setTafs(tafs: Taf[]) {
		this.tafs = tafs;
	}

	public removeTafs(taf: Taf) {
		let index = this.tafs.findIndex((el) => el === taf);
		this.tafs.splice(index, 1);
	}

	public clearTafs() {
		this.tafs = [];
	}

	public getLatestTaf(): Taf
	{
		if(this.latestTaf)
			return this.latestTaf;

		const latest = this.tafs.reduce((time, el) =>
			el.issueTime >= time.issueTime ? el.issueTime : time, this.tafs[0]);

		this.latestTaf = this.tafs.find(
			(element) => (element.issueTime == latest)
		);

		return this.latestTaf;
	}

	public getTafs(): Taf[] {
		return this.tafs.slice();
	}

	public updateWith(station:Station) {
		this.addMetarArray(station.metars);
		this.addTafArray(station.tafs);
		if(station.longitude)
			this.longitude = station.longitude;
		if(station.latitude)
			this.latitude = station.latitude;
		if(station.elevation)
			this.elevation = station.elevation;
		if(station.name)
			this.name = station.name;
		if(station.state)
			this.state = station.state;
		if(station.country)
			this.country = station.country;
		if(station.isMetarSupported)
			this.isMetarSupported = station.isMetarSupported;
		if(station.isTafSupported)
			this.isTafSupported = station.isTafSupported;
	}

	/**
	 * Calculate the distance from one point to another in Kilometers.
	 */
	public static calculateDistance(sourceLatitude, sourceLongitude, destinationLatitude, destinationLongitude) {
		let selfLatitude = sourceLatitude * Math.PI / 180;
		let destLatitude = destinationLatitude * Math.PI / 180;
		let deltaTheta = (destinationLongitude - sourceLongitude) * Math.PI / 180;
		let R = 6371; // Radius of Earth in Kilometers
		return Math.acos( Math.sin(selfLatitude) * Math.sin(destLatitude) + Math.cos(selfLatitude) * Math.cos(destLatitude) * Math.cos(deltaTheta) ) * R;
	}

	public setDistanceFromSource(sourceLatitude, sourceLongitude) {
		this.setDistance(Station.calculateDistance(sourceLatitude, sourceLongitude, this.latitude, this.longitude));
	}
	public getDistanceInKm(precision:number = 10) {
		let factor = Math.pow(10, precision);
		return Math.round(this.distance * factor) / factor;
	}
	public getDistanceInMiles() {

	}
	public getDistanceInStatuteMiles(precision:number = 10) {
		let factor = Math.pow(10, precision);
		return Math.round((this.distance * 0.621371) * factor) / factor;
	}
	public setDistance(distance: number) {
		this.distance = distance;
	}

	public getDistanceFromLocation(destinationLatitude, destinationLongitude) {
		return Station.calculateDistance(this.latitude, this.longitude, destinationLatitude, destinationLongitude);
	}

	public sleep() {
		this.metars.forEach(metar => metar.sleep());
		this.tafs.forEach(taf => taf.sleep());
	}

	public wakeup() {
		this.metars.forEach(metar => metar.wakeup());
		this.tafs.forEach(taf => taf.wakeup());
	}
}

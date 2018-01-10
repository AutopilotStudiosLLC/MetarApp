import {Metar} from "./metar.model";
import {Taf} from "./taf.model";

export class Station {
	private latestMetar: Metar;
	private latestTaf: Taf;

	constructor(
		public ident: string,
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
}

import {Metar} from "./metar.model";
import {Taf} from "./taf.model";

export class Station {
	private latestMetar:Metar;

	constructor(
		public ident: string,
		public metars: Metar[] = [],
		public tafs: Taf[] = []
		)
	{
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

	public getTafs(): Taf[] {
		return this.tafs.slice();
	}
}

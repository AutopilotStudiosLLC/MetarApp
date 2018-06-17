import {NgModule, ErrorHandler, Injectable, Injector} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';

import {ContactPage} from '../pages/contact/contact';
import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {MetarPage} from "../pages/metar/metar";
import {TafPage} from "../pages/taf/taf";
import {SearchPage} from "../pages/search/search";
import {MetarDetailsPage} from "../pages/metar/metarDetails/metarDetails";
import {HttpClientModule} from "@angular/common/http";
import {MetarHistoryPage} from "../pages/metar/metar-history/metar-history";
import {TafDetailsPage} from "../pages/taf/taf-details/taf-details";
import {AddsService} from "../services/adds.service";
import { Pro } from '@ionic/pro';
import {StationService} from "../services/station.service";
import {Geolocation} from "@ionic-native/geolocation";
import {IonicStorageModule} from "@ionic/storage";

const IonicPro = Pro.init('f377509b', {
	appVersion: "0.0.1"
});

@Injectable()
export class MyErrorHandler implements ErrorHandler {
	ionicErrorHandler: IonicErrorHandler;

	constructor(injector: Injector) {
		try {
			this.ionicErrorHandler = injector.get(IonicErrorHandler);
		} catch(e) {
			// Unable to get the IonicErrorHandler provider, ensure
			// IonicErrorHandler has been added to the providers list below
		}
	}

	handleError(err: any): void {
		IonicPro.monitoring.handleNewError(err);
		// Remove this if you want to disable Ionic's auto exception handling
		// in development mode.
		this.ionicErrorHandler && this.ionicErrorHandler.handleError(err);
	}
}

@NgModule({
	declarations: [
		MyApp,
		ContactPage,
		HomePage,
		TabsPage,
		MetarPage,
		MetarDetailsPage,
		MetarHistoryPage,
		TafPage,
		TafDetailsPage,
		SearchPage
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		IonicStorageModule.forRoot(),
		IonicModule.forRoot(MyApp)
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		ContactPage,
		HomePage,
		TabsPage,
		MetarPage,
		MetarDetailsPage,
		MetarHistoryPage,
		TafPage,
		TafDetailsPage,
		SearchPage
	],
	providers: [
		StatusBar,
		SplashScreen,
		Geolocation,
		StationService,
		AddsService,
		IonicErrorHandler,
		[{ provide: ErrorHandler, useClass: MyErrorHandler }]
	]
})
export class AppModule {
}

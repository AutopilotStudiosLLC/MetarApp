import {NgModule, ErrorHandler} from '@angular/core';
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
		AddsService,
		{provide: ErrorHandler, useClass: IonicErrorHandler}
	]
})
export class AppModule {
}

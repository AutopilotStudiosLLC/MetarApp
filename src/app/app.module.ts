import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';

import {ContactPage} from '../pages/contact/contact';
import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';
import {SettingsPage} from '../pages/settings/settings';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {MetarPage} from "../pages/metar/metar";
import {TafPage} from "../pages/taf/taf";
import {FlightPlanPage} from "../pages/flight-plan/flight-plan";
import {MetarDetailsPage} from "../pages/metar/metar-details/metar-details";
import {HttpClientModule} from "@angular/common/http";
import {MetarHistoryPage} from "../pages/metar/metar-history/metar-history";
import {TafDetailsPage} from "../pages/taf/taf-details/taf-details";
import {AddsService} from "../services/adds.service";
import {StationService} from "../services/station.service";
import {Geolocation} from "@ionic-native/geolocation";
import {IonicStorageModule} from "@ionic/storage";
import {FlightPlanService} from "../services/flight-plan.service";
import {ConfigService} from "../services/config.service";
import {ConversionService} from "../services/conversion.service";
import {SearchBarLayout1Module} from "../components/search-bar/layout-1/search-bar-layout-1.module";
import {StationCardModule} from "../components/station-card/station-card.module";
import {MetarListItemModule} from "../components/metar-list-item/metar-list-item.module";
import {MetarHistoryListItemModule} from "../components/metar-history-list-item/metar-history-list-item.module";
import {TafListItemModule} from "../components/taf-list-item/taf-list-item.module";
import {TafForecastShortModule} from "../components/taf-forecast-short/taf-forecast-short.module";
import {TafForecastHeaderModule} from "../components/taf-forecast-header/taf-forecast-header.module";
import {TafForecastContentModule} from "../components/taf-forecast-content/taf-forecast-content.module";
import {PirepListItemModule} from "../components/pirep-list-item/pirep-list-item.module";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {AirsigmetListItemModule} from "../components/airsigmet-list-item/airsigmet-list-item.module";

@NgModule({
	declarations: [
		MyApp,
		ContactPage,
		HomePage,
		TabsPage,
		SettingsPage,
		MetarPage,
		MetarDetailsPage,
		MetarHistoryPage,
		TafPage,
		TafDetailsPage,
		FlightPlanPage
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		IonicStorageModule.forRoot(),
		IonicModule.forRoot(MyApp),
		MetarListItemModule,
		MetarHistoryListItemModule,
		SearchBarLayout1Module,
		StationCardModule,
		TafListItemModule,
		TafForecastShortModule,
		TafForecastHeaderModule,
		TafForecastContentModule,
		AirsigmetListItemModule,
		PirepListItemModule,
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
		SettingsPage,
		TafPage,
		TafDetailsPage,
		FlightPlanPage
	],
	providers: [
		StatusBar,
		SplashScreen,
		Geolocation,
		StationService,
		FlightPlanService,
		AddsService,
		ConfigService,	
		ConversionService,
		InAppBrowser,
		[{ provide: ErrorHandler, useClass: IonicErrorHandler }]
	]
})
export class AppModule {
}

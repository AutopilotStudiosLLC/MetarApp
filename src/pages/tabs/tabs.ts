import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import {FlightPlanPage} from "../flight-plan/flight-plan";
import {MetarPage} from "../metar/metar";
import {TafPage} from "../taf/taf";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  homeRoot = HomePage;
  flightPlanRoot = FlightPlanPage;
  metarRoot = MetarPage;
  tafRoot = TafPage;

  constructor() {

  }
}

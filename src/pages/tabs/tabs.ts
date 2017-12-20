import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import {SearchPage} from "../search/search";
import {MetarPage} from "../metar/metar";
import {TafPage} from "../taf/taf";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  homeRoot = HomePage;
  searchRoot = SearchPage;
  metarRoot = MetarPage;
  tafRoot = TafPage;

  constructor() {

  }
}

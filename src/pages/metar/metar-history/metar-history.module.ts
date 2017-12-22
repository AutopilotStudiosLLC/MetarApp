import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MetarHistoryPage } from './metar-history';

@NgModule({
  declarations: [
    MetarHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(MetarHistoryPage),
  ],
})
export class MetarHistoryPageModule {}

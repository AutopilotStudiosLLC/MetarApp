import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MetarDetailsPage } from './metarDetails';

@NgModule({
  declarations: [
    MetarDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(MetarDetailsPage),
  ],
})
export class MetarDetailsPageModule {}

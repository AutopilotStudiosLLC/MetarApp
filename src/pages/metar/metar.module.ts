import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MetarPage } from './metar';

@NgModule({
  declarations: [
    MetarPage,
  ],
  imports: [
    IonicPageModule.forChild(MetarPage),
  ],
})
export class MetarPageModule {}

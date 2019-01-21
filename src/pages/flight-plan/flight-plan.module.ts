import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FlightPlanPage } from './flight-plan';

@NgModule({
  declarations: [
    FlightPlanPage,
  ],
  imports: [
    IonicPageModule.forChild(FlightPlanPage),
  ],
})
export class FlightPlanPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AttendanceComponent } from './attendance';

@NgModule({
  declarations: [
    AttendanceComponent,
  ],
  imports: [
    IonicPageModule.forChild(AttendanceComponent),
  ],
  exports: [
    AttendanceComponent
  ]
})
export class AttendanceComponentModule {}

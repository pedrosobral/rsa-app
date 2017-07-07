import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { TristateLabelComponent } from './tristate-label/tristate-label';
import { SlideComponent } from './slide/slide';
import { AttendanceComponent } from './attendance/attendance';
import { StudentsOnlineComponent } from './students-online/students-online';
import { LogAccessComponent } from './log-access/log-access';

@NgModule({
  declarations: [
    TristateLabelComponent,
    SlideComponent,
    AttendanceComponent,
    StudentsOnlineComponent,
    LogAccessComponent,
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    TristateLabelComponent,
    SlideComponent,
    AttendanceComponent,
    StudentsOnlineComponent,
    LogAccessComponent,
  ]
})
export class ComponentsModule {
}

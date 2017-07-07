import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { TristateLabelComponent } from './tristate-label/tristate-label';
import { SlideComponent } from './slide/slide';
import { AttendanceComponent } from './attendance/attendance';
import { StudentsOnlineComponent } from './students-online/students-online';

@NgModule({
  declarations: [
    TristateLabelComponent,
    SlideComponent,
    AttendanceComponent,
    StudentsOnlineComponent,
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
  ]
})
export class ComponentsModule {
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { TristateLabelComponent } from './tristate-label/tristate-label';
import { SlideComponent } from './slide/slide';
import { AttendanceComponent } from './attendance/attendance';

@NgModule({
  declarations: [
    TristateLabelComponent,
    SlideComponent,
    AttendanceComponent,
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    TristateLabelComponent,
    SlideComponent,
    AttendanceComponent,
  ]
})
export class ComponentsModule {
}

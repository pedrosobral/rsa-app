import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfessorAttendanceDetailsPage } from './professor-attendance-details';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    ProfessorAttendanceDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfessorAttendanceDetailsPage),
    MomentModule,
  ],
  exports: [
    ProfessorAttendanceDetailsPage
  ]
})
export class ProfessorAttendanceDetailsPageModule {}

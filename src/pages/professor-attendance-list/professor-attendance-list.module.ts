import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfessorAttendanceListPage } from './professor-attendance-list';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    ProfessorAttendanceListPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfessorAttendanceListPage),
    MomentModule,
  ],
  exports: [
    ProfessorAttendanceListPage
  ]
})
export class ProfessorAttendanceListPageModule {}

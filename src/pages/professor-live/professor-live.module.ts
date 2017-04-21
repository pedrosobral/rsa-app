import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfessorLivePage } from './professor-live';
import { SlideComponent } from '../../components/slide/slide';
import { AttendanceComponent } from '../../components/attendance/attendance';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    ProfessorLivePage,
    AttendanceComponent,
    SlideComponent,
  ],
  imports: [
    IonicPageModule.forChild(ProfessorLivePage),
    MomentModule,
  ],
  exports: [
    ProfessorLivePage
  ]
})
export class ProfessorLivePageModule {}

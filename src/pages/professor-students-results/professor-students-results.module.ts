import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfessorStudentsResultsPage } from './professor-students-results';

@NgModule({
  declarations: [
    ProfessorStudentsResultsPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfessorStudentsResultsPage),
  ],
  exports: [
    ProfessorStudentsResultsPage
  ]
})
export class ProfessorStudentsResultsPageModule {}

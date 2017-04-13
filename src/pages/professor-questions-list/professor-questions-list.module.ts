import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfessorQuestionsListPage } from './professor-questions-list';

@NgModule({
  declarations: [
    ProfessorQuestionsListPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfessorQuestionsListPage),
  ],
  exports: [
    ProfessorQuestionsListPage
  ]
})
export class ProfessorQuestionsListPageModule {}

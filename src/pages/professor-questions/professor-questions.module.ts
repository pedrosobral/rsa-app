import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfessorQuestionsPage } from './professor-questions';

@NgModule({
  declarations: [
    ProfessorQuestionsPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfessorQuestionsPage),
  ],
  exports: [
    ProfessorQuestionsPage
  ]
})
export class ProfessorQuestionsPageModule {}

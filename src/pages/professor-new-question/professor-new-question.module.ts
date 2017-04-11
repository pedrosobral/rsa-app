import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfessorNewQuestionPage } from './professor-new-question';

@NgModule({
  declarations: [
    ProfessorNewQuestionPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfessorNewQuestionPage),
  ],
  exports: [
    ProfessorNewQuestionPage
  ]
})
export class ProfessorNewQuestionPageModule {}

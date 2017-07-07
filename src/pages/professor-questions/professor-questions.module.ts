import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfessorQuestionsPage } from './professor-questions';
import { ComponentsModule } from '../../components';

@NgModule({
  declarations: [
    ProfessorQuestionsPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ProfessorQuestionsPage),
  ],
  exports: [
    ProfessorQuestionsPage
  ]
})
export class ProfessorQuestionsPageModule {}

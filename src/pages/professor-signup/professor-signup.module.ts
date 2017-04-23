import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfessorSignupPage } from './professor-signup';

@NgModule({
  declarations: [
    ProfessorSignupPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfessorSignupPage),
  ],
  exports: [
    ProfessorSignupPage
  ]
})
export class ProfessorSignupPageModule {}

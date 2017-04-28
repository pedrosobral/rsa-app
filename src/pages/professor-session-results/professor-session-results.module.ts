import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfessorSessionResultsPage } from './professor-session-results';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    ProfessorSessionResultsPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfessorSessionResultsPage),
    MomentModule,
  ],
  exports: [
    ProfessorSessionResultsPage
  ]
})
export class ProfessorSessionResultsPageModule {}

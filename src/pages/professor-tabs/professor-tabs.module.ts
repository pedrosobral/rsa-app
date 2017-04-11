import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfessorTabsPage } from './professor-tabs';

@NgModule({
  declarations: [
    ProfessorTabsPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfessorTabsPage),
  ],
  exports: [
    ProfessorTabsPage
  ]
})
export class ProfessorTabsPageModule {}

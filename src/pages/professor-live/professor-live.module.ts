import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfessorLivePage } from './professor-live';
import { MomentModule } from 'angular2-moment';
import { ComponentsModule } from '../../components';

@NgModule({
  declarations: [
    ProfessorLivePage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ProfessorLivePage),
    MomentModule,
  ],
  exports: [
    ProfessorLivePage
  ]
})
export class ProfessorLivePageModule {}

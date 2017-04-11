import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfessorLivePage } from './professor-live';
import { SlideComponent } from '../../components/slide/slide';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    ProfessorLivePage,
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

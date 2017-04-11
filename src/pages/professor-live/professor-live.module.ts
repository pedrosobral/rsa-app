import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfessorLivePage } from './professor-live';
import { SlideComponent } from '../../components/slide/slide';

@NgModule({
  declarations: [
    ProfessorLivePage,
    SlideComponent,
  ],
  imports: [
    IonicPageModule.forChild(ProfessorLivePage),
  ],
  exports: [
    ProfessorLivePage
  ]
})
export class ProfessorLivePageModule {}

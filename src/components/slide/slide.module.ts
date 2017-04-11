import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SlideComponent } from './slide';

@NgModule({
  declarations: [
    SlideComponent,
  ],
  imports: [
    IonicPageModule.forChild(SlideComponent),
  ],
  exports: [
    SlideComponent
  ]
})
export class SlideComponentModule {}

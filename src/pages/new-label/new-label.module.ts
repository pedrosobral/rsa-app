import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewLabelPage } from './new-label';

@NgModule({
  declarations: [
    NewLabelPage,
  ],
  imports: [
    IonicPageModule.forChild(NewLabelPage),
  ],
  exports: [
    NewLabelPage
  ]
})
export class NewLabelPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddLabelPage } from './add-label';
import { TristateLabelComponent } from '../../components/tristate-label/tristate-label';

@NgModule({
  declarations: [
    AddLabelPage,
    TristateLabelComponent,
  ],
  imports: [
    IonicPageModule.forChild(AddLabelPage),
  ],
  exports: [
    AddLabelPage
  ]
})
export class AddLabelPageModule {}

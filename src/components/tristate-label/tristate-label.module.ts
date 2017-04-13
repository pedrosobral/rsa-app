import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TristateLabelComponent } from './tristate-label';

@NgModule({
  declarations: [
    TristateLabelComponent,
  ],
  imports: [
    IonicPageModule.forChild(TristateLabelComponent),
  ],
  exports: [
    TristateLabelComponent
  ]
})
export class TristateLabelComponentModule {}

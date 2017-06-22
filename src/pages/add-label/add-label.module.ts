import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddLabelPage } from './add-label';
import { ComponentsModule } from '../../components';

@NgModule({
  declarations: [
    AddLabelPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(AddLabelPage),
  ],
  exports: [
    AddLabelPage
  ]
})
export class AddLabelPageModule {}

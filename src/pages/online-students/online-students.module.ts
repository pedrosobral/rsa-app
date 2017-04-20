import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OnlineStudentsPage } from './online-students';

@NgModule({
  declarations: [
    OnlineStudentsPage,
  ],
  imports: [
    IonicPageModule.forChild(OnlineStudentsPage),
  ],
  exports: [
    OnlineStudentsPage
  ]
})
export class OnlineStudentsPageModule {}

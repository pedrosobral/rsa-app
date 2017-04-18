import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddStudentsPage } from './add-students';

@NgModule({
  declarations: [
    AddStudentsPage,
  ],
  imports: [
    IonicPageModule.forChild(AddStudentsPage),
  ],
  exports: [
    AddStudentsPage
  ]
})
export class AddStudentsPageModule {}

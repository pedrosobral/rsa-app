import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfessorRoomPage } from './professor-room';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    ProfessorRoomPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfessorRoomPage),
    MomentModule,
  ],
  exports: [
    ProfessorRoomPage
  ]
})
export class ProfessorRoomPageModule {}

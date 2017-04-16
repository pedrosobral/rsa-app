import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({
  segment: 'list'
})
@Component({
  selector: 'page-professor-room',
  templateUrl: 'professor-room.html',
})
export class ProfessorRoomPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
}

import { Component } from '@angular/core';

import {
  IonicPage,
  NavController,
  NavParams,
} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-online-students',
  templateUrl: 'online-students.html',
})
export class OnlineStudentsPage {
  room = this.navParams.get('room');

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
  }

  ionViewDidLoad() {
    console.info('room', this.room);
  }

}

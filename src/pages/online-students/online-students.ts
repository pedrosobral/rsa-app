import { Component } from '@angular/core';

import {
  IonicPage,
  NavController,
  NavParams,
} from 'ionic-angular';

import {
  RoomsProvider,
} from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-online-students',
  templateUrl: 'online-students.html',
})
export class OnlineStudentsPage {
  // room = this.navParams.get('room');
  room: any;

  constructor(
    public rs: RoomsProvider,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
  }

  ionViewDidLoad() {
    this.rs.active().subscribe((room) => {
      this.room = room.data[0];
      this.room.people = this.room.students.filter(s => s.online).length;
    });
    // console.info('room', this.room);
  }

}

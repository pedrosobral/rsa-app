import { Component } from '@angular/core';

import {
  IonicPage,
  NavController,
  NavParams,
} from 'ionic-angular';

import {
  FeathersProvider,
  RoomsProvider,
} from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-online-students',
  templateUrl: 'online-students.html',
})
export class OnlineStudentsPage {
  room: any;

  constructor(
    public app: FeathersProvider,
    public rs: RoomsProvider,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
  }

  ionViewDidLoad() {
    this.rs.active().subscribe((room) => {
      this.room = room.data[0];
      this.room.people = this.room.students && this.room.students.filter(s => s.online).length || 0;
    });
  }

  clear() {
    // TODO: move to provider
    const room = {
      _id: this.room._id,
    };

    this.app.socket().emit('clear room', {
      room,
    });
  }

}

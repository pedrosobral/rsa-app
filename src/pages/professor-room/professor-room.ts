import { Component } from '@angular/core';

import {
  IonicPage,
  ModalController,
  NavController,
  NavParams,
} from 'ionic-angular';

import { RoomsProvider } from '../../providers/providers';

@IonicPage({
  segment: 'list'
})
@Component({
  selector: 'page-professor-room',
  templateUrl: 'professor-room.html',
})
export class ProfessorRoomPage {
  rooms: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public rs: RoomsProvider,
  ) { }

  ionViewDidLoad() {
    this.rs.find().subscribe((rooms) => {
      this.rooms = rooms.data;
    });
  }

  newRoom() {
    this.modalCtrl.create('NewRoomPage').present();
  }

  students(room) {
    this.navCtrl.push('AddStudentsPage', { room });
  }

  activate(room) {
    const online = this.rooms.filter(x => x.online && x._id !== room._id);

    if (online.length > 0) {
      online.forEach((r) => {
        this.rs.activate(r, false);
      });
    }
    this.rs.activate(room, room.online);

  }
}

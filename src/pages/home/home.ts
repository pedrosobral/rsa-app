import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { PollPage } from '../pages';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  room = 'A1';

  constructor(public navCtrl: NavController) { }

  goToPoll(room: String) {
    room && this.navCtrl.push(PollPage, { room: room.toUpperCase() });
  }
}

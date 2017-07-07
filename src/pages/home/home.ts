import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { LogAccessProvider } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  log: any;

  constructor(
    public navCtrl: NavController,
    public logAccess: LogAccessProvider,
  ) { }

  ionViewDidEnter() {
    this.logAccess.history.then((data) => {
      this.log = data;
    });
  }

  goToPoll(room: String) {
    room && this.navCtrl.push('PollPage', { id: room.toUpperCase() });
  }

  goToDashboard() {
    this.navCtrl.push('ProfessorTabsPage');
  }

  goLogin() {
    this.navCtrl.push('ProfessorLoginPage');
  }
}

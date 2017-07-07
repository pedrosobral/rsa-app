import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';

import { LogAccessProvider } from '../../providers/providers';

import { AuthProvider } from '../../providers/providers';

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
    public auth: AuthProvider,
    public loadCtrl: LoadingController,
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
    this.loadCtrl.create({
      content: 'Carregando...',
      dismissOnPageChange: true,
    }).present();

    this.auth.isLoggedIn().then(result => {
      if (!result) {
        return this.navCtrl.push('ProfessorLoginPage');
      }
      return this.navCtrl.push('ProfessorTabsPage');
    })
  }
}

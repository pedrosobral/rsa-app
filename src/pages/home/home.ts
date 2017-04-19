import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(public navCtrl: NavController) { }

  goToPoll(room: String) {
    room && this.navCtrl.push('PollPage', { room: room.toUpperCase() });
  }

  goToDashboard() {
    this.navCtrl.push('ProfessorTabsPage');
  }

  goLogin() {
    this.navCtrl.push('ProfessorLoginPage');
  }
}

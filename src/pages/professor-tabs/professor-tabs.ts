import { Component, ViewChild } from '@angular/core';
import { NavController, IonicPage, Events, Tabs } from 'ionic-angular';

import { AuthProvider } from '../../providers/providers';

@IonicPage({
  segment: 'dashboard',
  defaultHistory: ['HomePage']
})
@Component({
  selector: 'page-professor-tabs',
  templateUrl: 'professor-tabs.html',
})
export class ProfessorTabsPage {
  @ViewChild('tabs') tabs: Tabs;

  room = 'ProfessorRoomPage';
  live = 'ProfessorLivePage';
  manager = 'ProfessorQuestionsListPage';

  constructor(
    public auth: AuthProvider,
    public navCtrl: NavController,
    public events: Events,
  ) {
    events.subscribe('tabs:select', (tab) => {
      this.tabs.select(tab);
    });
  }

  ionViewCanEnter(): Promise<Boolean> {
    return this.auth.isLoggedIn()
      .then((isLoggedIn) => {
        if (!isLoggedIn) {
          this.navCtrl.push('ProfessorLoginPage');
          return false;
        }
        return true;
      });
  }
}

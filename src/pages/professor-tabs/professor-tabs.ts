import { Component, ViewChild } from '@angular/core';
import { IonicPage, Events, Tabs } from 'ionic-angular';

@IonicPage({
  segment: 'dashboard'
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

  constructor(public events: Events) {
    events.subscribe('tabs:select', (tab) => {
      this.tabs.select(tab);
    });
  }
}

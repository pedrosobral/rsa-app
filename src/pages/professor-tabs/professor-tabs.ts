import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage({
  segment: 'dashboard'
})
@Component({
  selector: 'page-professor-tabs',
  templateUrl: 'professor-tabs.html',
})
export class ProfessorTabsPage {
  questions = 'ProfessorQuestionsPage';
  live = 'ProfessorLivePage';
  manager = 'ProfessorQuestionsListPage';

  constructor() {}
}

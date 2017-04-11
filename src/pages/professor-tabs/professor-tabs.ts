import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-professor-tabs',
  templateUrl: 'professor-tabs.html',
})
export class ProfessorTabsPage {
  questions = 'ProfessorQuestionsPage';
  live = 'ProfessorLivePage';

  constructor() {}
}

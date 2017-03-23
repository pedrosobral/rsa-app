import { Component } from '@angular/core';

import {
  ProfessorQuestionsPage,
  ProfessorLivePage,
} from '../pages';

@Component({
  selector: 'page-professor-tabs',
  templateUrl: 'professor-tabs.html'
})
export class ProfessorTabsPage {
  questions = ProfessorQuestionsPage;
  live = ProfessorLivePage;

  constructor() {}
}

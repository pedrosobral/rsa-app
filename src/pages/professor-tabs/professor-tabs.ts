import { Component } from '@angular/core';

import {
  ProfessorQuestionsPage,
} from '../pages';

@Component({
  selector: 'page-professor-tabs',
  templateUrl: 'professor-tabs.html'
})
export class ProfessorTabsPage {
  questions = ProfessorQuestionsPage;

  constructor() {}
}

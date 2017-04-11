import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {
  ProfessorQuestionsPage,
} from '../pages';

@IonicPage()
@Component({
  selector: 'page-professor-tabs',
  templateUrl: 'professor-tabs.html',
})
export class ProfessorTabsPage {
  questions = ProfessorQuestionsPage;
  live = 'ProfessorLivePage';

  constructor() {}
}

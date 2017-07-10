import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';

@IonicPage({
  segment: 'poll/question/students'
})
@Component({
  selector: 'page-professor-students-results',
  templateUrl: 'professor-students-results.html',
})
export class ProfessorStudentsResultsPage {
  question = this.navParams.get('question');

  constructor(public navParams: NavParams) { }
}

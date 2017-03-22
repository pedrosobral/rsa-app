import { Component } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';

import {
  ProfessorNewQuestionPage,
} from '../pages';

@Component({
  selector: 'page-professor-questions',
  templateUrl: 'professor-questions.html'
})
export class ProfessorQuestionsPage {

  constructor(
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public navParams: NavParams) {}

  ionViewDidLoad() { }

  newQuestion() {
    this.modalCtrl.create(ProfessorNewQuestionPage).present();
  }

}

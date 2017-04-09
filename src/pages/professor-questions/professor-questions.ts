import { Component } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';

import {
  ProfessorNewQuestionPage,
} from '../pages';

import {
  PollService,
  QuestionService,
} from '../../providers/providers';

@Component({
  selector: 'page-professor-questions',
  templateUrl: 'professor-questions.html'
})
export class ProfessorQuestionsPage {
  questions: any;
  sessionQuestions: any = [];

  constructor(
    public ps: PollService,
    public qs: QuestionService,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public navParams: NavParams) { }

  ionViewDidLoad() {
    this.qs.find().subscribe((questions) => {
      this.questions = questions.data;
      this.questions.forEach(q => {
        Object.assign(q, {
          image: this.getImage(q.type),
          typeDescription: this.getType(q.type)
        });
      });
    });
  }

  newQuestion() {
    this.modalCtrl.create(ProfessorNewQuestionPage).present();
  }

  goLive() {
    const poll = {
      questions: this.sessionQuestions,
      room: 'FISC123',
    };

    this.ps.create(poll)
      .then(() => {
        this.navCtrl.parent.select(1);
      });
  }

  questionSelected() {
    this.sessionQuestions = this.questions.filter(x => x.isChecked);
  }

  getType(type) {
    switch (type) {
      case 'mc': {
        return 'Múltipla escolha';
      }
      case 'free': {
        return 'Aberta';
      };
      case 'bool': {
        return 'Verdadeiro/Falso';
      };
    }
  }

  getImage(type) {
    switch (type) {
      case 'mc': {
        return './assets/icon/mc.png';
      }
      case 'free': {
        return './assets/icon/free_text.png';
      };
      case 'bool': {
        return './assets/icon/mc.png';
      };
    }
  }

}

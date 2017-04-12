import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';

import {
  PollService,
  QuestionService,
} from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-professor-questions',
  templateUrl: 'professor-questions.html',
})
export class ProfessorQuestionsPage {
  questions: any = [];
  sessionQuestions: any = [];

  isFromEdit: boolean = false;

  constructor(
    public ps: PollService,
    public qs: QuestionService,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public navParams: NavParams) { }

  ionViewDidLoad() {
    this.qs.find().subscribe((questions) => {
      if (!questions.data.length) return;

      // case add questions
      if (!this.isFromEdit) {
        this.updateQuestions(questions);
      } else {
        // handle edit mode
        this.updateEditedQuestion(questions);
      }

      this.questions.forEach(q => {
        Object.assign(q, {
          image: this.getImage(q.type),
          typeDescription: this.getType(q.type)
        });
      });
    });
  }

  updateQuestions(questions) {
    if (questions.data.length > 1) {
      this.questions = questions.data;
    } else {
      questions.data.forEach((q) => {
        this.questions.push(q);
      });
    }
  }

  updateEditedQuestion(questions) {
    const index = this.questions.findIndex((x) => x._id === questions.data[0]._id);
    this.questions[index] = questions.data[0];
  }

  newQuestion() {
    this.modalCtrl
      .create('ProfessorNewQuestionPage')
      .present()
      .then(() => this.isFromEdit = false);
  }

  edit(question) {
    this.modalCtrl
      .create('ProfessorNewQuestionPage', { question })
      .present()
      .then(() => this.isFromEdit = true);
  }

  remove(question) {
    this.qs.remove(question).then((q) => {
      const index = this.questions.findIndex((x) => x._id === q._id);

      // remove it from list
      this.questions.splice(index, 1);
    });
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

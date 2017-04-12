import { Component } from '@angular/core';
import {
  IonicPage,
  ModalController,
  NavController,
  NavParams,
  ToastController,
} from 'ionic-angular';

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

  // used for undo remove
  backup: any = [];

  sessionQuestions: any = [];

  isFromEdit: boolean = false;

  // undo controll
  undo: boolean = false;

  constructor(
    public ps: PollService,
    public qs: QuestionService,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
  ) { }

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
    // backup for undo
    this.backup = Object.assign([], this.questions);

    this.removeFromArray(question);

    setTimeout(() => {
      !this.undo && this.qs.remove(question);
    }, 5000);

    this.presentToast('Questão removida');
  }

  removeFromArray(q) {
    const index = this.questions.findIndex((x) => x._id === q._id);

    // remove it from list
    this.questions.splice(index, 1);
  }

  undoRemove() {
    this.questions = [];
    this.backup.forEach(q => this.questions.push(q));
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

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message,
      duration: 5000,
      showCloseButton: true,
      closeButtonText: 'Desfazer',
    });
    toast.onDidDismiss((data, role) => {
      if (role === 'close') {
        this.undo = true;
        this.undoRemove();
      }
    });
    return toast.present();
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

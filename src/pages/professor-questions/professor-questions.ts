import { Component } from '@angular/core';

import {
  AlertController,
  Events,
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

@IonicPage({
  segment: 'list'
})
@Component({
  selector: 'page-professor-questions',
  templateUrl: 'professor-questions.html',
})
export class ProfessorQuestionsPage {
  questions: any = [];
  sessionQuestions: any = [];

  constructor(
    public events: Events,
    public ps: PollService,
    public qs: QuestionService,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
  ) {
    // filter by label event subscribe
    this.events.subscribe('filter:label', (label) => {
      this.getQuestionByLabel(label._id);
    });

    this.events.subscribe('label:changed', () => this.refresh());
  }

  ionViewDidLoad() {
    this.qs.find().subscribe(() => this.refresh());

    // workaround b/c service is not triggering
    // with populate ['labels'] on created
    this.qs.questions.on('created', () => this.refresh());
  }

  refresh() {
    this.qs.find().then((questions) => {
      this.questions = questions.data;
      this.formatQuestions();
    });
  }

  formatQuestions() {
    this.questions.forEach(q => {
      Object.assign(q, {
        typeDescription: this.getType(q.type)
      });
    });
  }

  getQuestionByLabel(label) {
    this.qs.findByLabel(label).then((questions) => {
      this.questions = questions.data;
      this.formatQuestions();
    });
  }

  newQuestion() {
    this.modalCtrl
      .create('ProfessorNewQuestionPage')
      .present()
  }

  edit(question) {
    this.modalCtrl
      .create('ProfessorNewQuestionPage', { question })
      .present()
  }

  remove(question) {
    this.qs.remove(question)
      .then((q) => {
        // show toast
        this.presentToast('Questão removida');
      });
  }

  labelIt() {
    this.modalCtrl.create('AddLabelPage', { questions: this.sessionQuestions }).present();
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
      duration: 3000,
    });
    return toast.present();
  }

  showConfirm(question) {
    let confirm = this.alertCtrl.create({
      title: 'Remover questão?',
      message: 'Essa operação não pode ser desfeita.',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            this.presentToast('Remoção cancelada');
          }
        },
        {
          text: 'OK',
          handler: () => {
            this.remove(question);
          }
        }
      ]
    });
    confirm.present();
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
}

import { Component } from '@angular/core';

import {
  AlertController,
  Events,
  IonicPage,
  ModalController,
  NavController,
  NavParams,
  ToastController,
  LoadingController,
} from 'ionic-angular';

import {
  FeathersProvider,
  PollService,
  QuestionService,
  RoomsProvider,
  AttendanceProvider,
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

  isFiltered: boolean = false;

  room: any;

  constructor(
    public events: Events,
    public app: FeathersProvider,
    public ps: PollService,
    public qs: QuestionService,
    public rs: RoomsProvider,
    public attendance: AttendanceProvider,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public loadCtrl: LoadingController,
  ) {
    // filter by label event subscribe
    this.events.subscribe('label:filter', (label) => {
      this.isFiltered = true;

      if (!label.text) {
        this.isFiltered = false;
      }

      this.getQuestionByLabel(label._id);
    });

    this.events.subscribe('label:changed', () => {
      this.refresh();
    });

    // active room
    this.getActiveRoom();
  }

  ionViewDidLoad() {
    this.qs.find().subscribe(() => this.refresh());

    // workaround b/c service is not triggering
    // with populate ['labels'] on created
    this.qs.questions.on('created', () => this.refresh());
  }

  refresh() {
    // clear selected questions
    this.sessionQuestions = [];

    this.qs.find().then((questions) => {
      const previousQuestions = Object.assign([], this.questions);

      // update questions
      this.questions = questions.data;

      // preserve selected questions
      this.setSelectedQuestions(previousQuestions);

      // format properly
      this.formatQuestions();

      // no filter
      this.isFiltered = false;
    });
  }

  setSelectedQuestions(questions) {
    questions
      .filter(x => x.isChecked)
      .forEach((q) => {
        const question = this.questions.find(x => x._id === q._id);
        question && (question.isChecked = true);
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

      // clear selected questions
      this.sessionQuestions = [];
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

  populateWithStudents(questions) {
    questions.forEach((q) => {
      q.students = this.room.students;
      delete q.online;
    });
  }

  goLive() {
    const loading = this.presentLoading();
    loading.present();

    this.events.subscribe('session:loaded', () => {
      this.events.unsubscribe('session:loaded');
      loading.dismiss();
    });

    this.populateWithStudents(this.sessionQuestions);

    const poll = {
      questions: this.sessionQuestions,
      room: this.room,
    };

    this.ps.create(poll)
      .then(() => {
        this.events.publish('room:live', this.room);
        this.events.publish('tabs:select', 1);
      });
  }

  getActiveRoom() {
    this.rs.active().subscribe((room) => {
      this.room = room.data[0];
    });
  }

  questionSelected() {
    this.sessionQuestions = this.questions.filter(x => x.isChecked);
  }

  presentLoading() {
    return this.loadCtrl.create({
      content: 'Carregando...',
      duration: 5000
    });
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

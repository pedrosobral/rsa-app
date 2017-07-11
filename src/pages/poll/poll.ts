import {
  Component,
  ViewChild,
} from '@angular/core';

import {
  AlertController,
  NavController,
  IonicPage,
  NavParams,
  ToastController,
  FabContainer,
  LoadingController,
} from 'ionic-angular';

import {
  AttendanceProvider,
  FeathersProvider,
  PollService,
  RoomsProvider,
  LogAccessProvider,
} from '../../providers/providers';

@IonicPage({
  segment: 'poll/:id',
  defaultHistory: ['HomePage']
})
@Component({
  selector: 'page-poll',
  templateUrl: 'poll.html',
})
export class PollPage {
  @ViewChild('fab') fab: FabContainer;
  labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  code: String = this.navParams.get('id');
  poll: any;
  question: any;
  room: any;
  student: any;
  attendance: any;

  answer: any;

  /**
   * Keep track of any active overlay to dismiss
   * when will leave.
   */
  currentModal: any;

  constructor(
    public app: FeathersProvider,
    public attendanceProvider: AttendanceProvider,
    public rooms: RoomsProvider,
    public ps: PollService,
    public navParams: NavParams,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public loadCtrl: LoadingController,
    public logAccess: LogAccessProvider,
  ) { }

  ionViewDidEnter() {
    this.getRoomInfo();
  }

  ionViewWillLeave() {
    // dismiss any current overlay
    this.currentModal && this.currentModal.dismiss();
  }

  clearRoom() {
    this.app.socket().on('clear room', (data) => {
      if (data.room === this.room._id) {
        // pop to home
        this.navCtrl.canGoBack() && this.navCtrl.popToRoot();
      }
    });
  }

  presentLoading(msg) {
    return this.loadCtrl.create({
      content: msg,
    });
  }

  getRoomInfo() {
    const loader = this.presentLoading('Carregando...');
    loader.present();

    this.rooms.room(this.code)
      .then((result) => {
        loader.dismiss();

        if (!result.total) {
          // back if room does not exist
          this.navCtrl.pop();
          return;
        }

        // get room info
        this.room = result.data[0];

        if (this.room.private) {
          // private room
          this.askId();
        } else {
          // anonymous room
          this.app.socket().emit('anonymous enter room', { room: this.room });

          // poll
          this.initPoll();
        }

        // listening to event `clear room`
        this.clearRoom();

        // add room entry to log access
        this.logAccess.addHistory(Object.assign({}, this.room, {'code': this.code}));
      })
      .catch(() => {
        loader.dismiss().then(() => {
          this.navCtrl.pop();
        });
      });
  }

  ionViewDidLeave() {
    if (this.student && this.room && this.room.private) {
      this.app.socket().emit('student leave room');
    } else {
      this.app.socket().emit('anonymous leave room');
    }
  }

  initPoll() {
    this.ps.getPollByStudent({ code: this.code })
      .subscribe((poll) => {
        if (poll.data.length > 0 && poll.data[0].available !== -1) {
          this.poll = poll.data[0];
          this.question = this.poll.questions[this.poll.available];

          if (this.checkAlreadyAnswered(this.question)) {
            this.poll = null;
          }
        } else {
          this.poll = null;
        }
      });
  }

  checkAlreadyAnswered(question) {
    if (question.students) {
      const student = question.students.find(x => x._id === this.student._id);
      return student && student.answer;
    }
    return false;
  }

  initAttendance() {
    this.attendanceProvider
      .room(this.room, this.student)
      .subscribe((result) => {
        if (!result.total) return;
        this.attendance = result.data[0];

        // open fab list options
        this.fab.toggleList();

        this.isToStopAttendance(this.attendance);
      });
  }

  isToStopAttendance(attendance) {
    this.attendanceProvider
      .attendanceRoom(this.attendance)
      .subscribe((result) => {
        if (!result.total) return;

        // stop attendance
        this.attendance = null;
      });
  }

  askAttendance(title = 'Frequência') {
    let prompt = this.alertCtrl.create({
      enableBackdropDismiss: false,
      title,
      message: "Entre com o código que o seu professor disponibilizou.",
      inputs: [
        {
          name: 'code',
          placeholder: 'Código'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            this.currentModal = null;
          }
        },
        {
          text: 'Presente!',
          handler: data => {
            this.takeAttendance(data.code);
          }
        }
      ]
    });
    prompt.present();

    this.currentModal = prompt;
    prompt.onDidDismiss(() => {
      this.currentModal = null;
    });
  }

  takeAttendance(code) {
    this.attendanceProvider
      .take(this.attendance, code, this.student)
      .then((result) => {
        if (!result.length) {
          this.askAttendance('Código errado');
          return;
        }

        this.presentToast('Frequência salva');

        // fab toggle
        this.fab.toggleList();
      });
  }

  submit(answer) {
    if (this.question.type === 'free') {
      // anonymous free answer
      if (!this.student) {
        this.ps.anonymousShortAnswer(this.poll, this.poll.available, answer)
          .then(() => {
            this.answer = '';
            this.presentToast('Resposta enviada');
          });
        return;
      }

      this.ps.shortAnswer(this.poll, this.student, this.poll.available, answer)
        .then(() => {
          this.answer = '';
          this.presentToast('Resposta enviada');
        });
      return;
    }

    this.ps.answer(this.poll, this.student, this.poll.available, answer)
      .then((res) => {
        this.poll = null;
        this.answer = '';
        this.presentToast('Resposta enviada');
      });
  }

  askId() {
    let prompt = this.alertCtrl.create({
      enableBackdropDismiss: false,
      title: 'Entrar',
      message: "Essa turma precisa identificação do estudante. Por favor, entre com o seu código de identificação para continuar.",
      inputs: [
        {
          name: 'id',
          placeholder: 'Identificação'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: (data) => {
            prompt.dismiss()
              .then(() => {
                this.navCtrl.canGoBack() && this.navCtrl.popToRoot();
              });
              return false;
          }
        },
        {
          text: 'Fazer login',
          handler: data => {
            // do login
            this.doLogin(data.id)
              .then(() => { return true });
          }
        }
      ]
    });
    prompt.present();

    this.currentModal = prompt;
    prompt.onDidDismiss(() => {
      this.currentModal = null;
    });
  }

  doLogin(id): Promise<any> {
    const loading = this.presentLoading('Carregando informações da sala...');
    loading.present();

    return this.rooms.login(this.room, id)
      .then((student) => {
        loading.dismiss();

        if (!student) {
          return this.askId();
        }

        // save student info
        this.student = student;

        // emit info about student to socket
        this.app.socket().emit('student enter room', {
          room: this.room,
          student: id,
        });

        // poll
        this.initPoll();

        // attendance
        this.initAttendance();
      });
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message,
      duration: 3000,
    });
    return toast.present();
  }
}

import { Component } from '@angular/core';

import {
  AlertController,
  NavController,
  IonicPage,
  NavParams,
} from 'ionic-angular';

import {
  FeathersProvider,
  PollService,
  RoomsProvider,
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
  code: String = this.navParams.get('id');
  poll: any;
  question: any;
  room: any;
  student: String;

  constructor(
    public app: FeathersProvider,
    public rooms: RoomsProvider,
    public ps: PollService,
    public navParams: NavParams,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
  ) { }

  ionViewDidEnter() {
    this.getRoomInfo();
  }

  getRoomInfo() {
    this.rooms.room(this.code)
      .then((result) => {
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
      });
  }

  ionViewDidLeave() {
    if (this.room.private) {
      this.app.socket().emit('student leave room');
    } else {
      this.app.socket().emit('anonymous leave room');
    }
  }

  initPoll() {
    this.ps.poll({ code: this.code })
      .subscribe((poll) => {
        if (poll.data.length > 0 && poll.data[0].available !== -1) {
          this.poll = poll.data[0];
          this.question = this.poll.questions[this.poll.available];
        } else {
          this.poll = null;
        }
      });
  }

  submit(answer) {
    this.ps.answer(this.poll, this.poll.available, answer)
      .then((res) => console.info(res));
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
          handler: data => {
            this.navCtrl.pop();
          }
        },
        {
          text: 'Fazer login',
          handler: data => {
            // save student info
            this.student = data.id;

            // do login
            this.doLogin(data.id);
          }
        }
      ]
    });
    prompt.present();
  }

  doLogin(id) {
    this.rooms.login(this.room, id)
      .then((studentOk) => {
        if (!studentOk) {
          return this.askId();
        }

        // emit info about student to socket
        this.app.socket().emit('student enter room', {
          room: this.room,
          student: id,
        });

        // poll!
        this.initPoll();
      })
  }
}

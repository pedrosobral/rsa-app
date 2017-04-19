import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';

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

  constructor(
    public app: FeathersProvider,
    public rooms: RoomsProvider,
    public ps: PollService,
    public navParams: NavParams,
  ) { }

  ionViewDidLoad() {
    this.initPoll();
  }

  getRoomInfo() {
    this.rooms.room(this.code)
      .subscribe((room) => {
        if (!room.total) return;
        console.info('room', room);
        this.room = room.data[0].name;
      });
  }

  ionViewDidEnter() {
    this.app.socket().emit('enter room', this.code);

    this.getRoomInfo();
  }

  ionViewDidLeave() {
    this.app.socket().emit('leave room', this.code);
  }

  initPoll() {
    this.ps.poll({ code: this.code }).subscribe((poll) => {
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
}

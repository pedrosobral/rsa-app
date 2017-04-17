import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';

import {
  PollService
} from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-poll',
  templateUrl: 'poll.html',
})
export class PollPage {
  code: String = this.navParams.get('room');
  poll: any;
  question: any;

  constructor(
    public ps: PollService,
    public navParams: NavParams,
  ) { }

  ionViewDidLoad() {
    this.initPoll();
  }

  ionViewDidEnter() {
    this.ps.socket.emit('enter room', this.code);
  }

  ionViewDidLeave() {
    this.ps.socket.emit('leave room', this.code);
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

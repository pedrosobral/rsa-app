import { Component } from '@angular/core';

import {
  NavController,
  NavParams,
} from 'ionic-angular';

import {
  PollService
} from '../../providers/providers';

@Component({
  selector: 'page-poll',
  templateUrl: 'poll.html'
})
export class PollPage {
  room: String = this.navParams.get('room');
  poll: any;

  constructor(
    public ps: PollService,
    public navCtrl: NavController,
    public navParams: NavParams) { }

  ionViewDidLoad() {
    this.initPoll();
  }

  initPoll() {
    this.ps.poll(this.room).subscribe((poll) => {
      if (poll.data.length > 0 && poll.data[0].available) {
        this.poll = poll.data[0].questions[0] || poll.data[0].questions;
      } else {
        this.poll = null;
      }
    });
  }

  submit(answer) {
    this.ps.answer(this.poll, answer).subscribe((res) => console.info(res));
  }
}

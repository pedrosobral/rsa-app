import { Injectable } from '@angular/core';
import * as RxJS from 'rxjs';
import 'rxjs/add/operator/map';

import * as io from 'socket.io-client';
import * as feathers from 'feathers/client';
import * as socketio from 'feathers-socketio/client';
import * as reactive from 'feathers-reactive';

import { APIService } from './api-service';

@Injectable()
export class PollService extends APIService {
  polls: any;

  constructor() {
    super();

    const socket = io(this.url);
    const app = feathers();

    app
      .configure(socketio(socket))
      .configure(reactive(RxJS));

    this.polls = app.service('polls');
  }

  create(poll) {
    return this.polls.create(poll);
  }

  poll(room: String) {
    return this.polls.find({ query: { room: room } });
  }

  setAvailable(poll, value) {
    return this.polls.patch(poll.id, {
      "available": value
    });
  }

  showChart(poll, questionIndex, value) {
    return this.polls.patch(poll.id, {
        [`questions.${questionIndex}.showChart`]: value
    });
  }

  showAnswer(poll, questionIndex, value) {
    return this.polls.patch(poll.id, {
        [`questions.${questionIndex}.showAnswer`]: value
    });
  }

  answer(poll, questionIndex, answer) {
    return this.polls.patch(poll.id, {
      "$inc": {
        [`questions.${questionIndex}.options.$.votes`]: 1
      }
    }, {
        query: {
          [`questions.${questionIndex}.options.text`]: answer
        }
      })
  }
}

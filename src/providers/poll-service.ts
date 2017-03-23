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

  answer(poll, answer) {
    return this.polls.patch(poll.id, {
      "$inc": {
        "questions.0.options.$.votes": 1
      }
    }, {
      query: {
        "questions.0.options.text": answer
      }
    })
  }
}

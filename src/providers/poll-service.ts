import { Injectable } from '@angular/core';
import * as RxJS from 'rxjs';
import 'rxjs/add/operator/map';

import * as io from 'socket.io-client';
import * as feathers from 'feathers/client';
import * as socketio from 'feathers-socketio/client';
import * as reactive from 'feathers-reactive';

const URL = 'http://localhost:3030';

@Injectable()
export class PollService {
  polls: any;

  constructor() {
    const socket = io(URL);
    const app = feathers();

    app
      .configure(socketio(socket))
      .configure(reactive(RxJS));

    this.polls = app.service('polls');
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

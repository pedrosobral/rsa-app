import { Injectable } from '@angular/core';
import * as RxJS from 'rxjs';
import 'rxjs/add/operator/map';

import * as io from 'socket.io-client';
import * as feathers from 'feathers/client';
import * as socketio from 'feathers-socketio/client';
import * as reactive from 'feathers-reactive';

import { APIService } from './api-service';

@Injectable()
export class QuestionService extends APIService {
  polls: any;

  constructor() {
    super();

    const socket = io(this.url);
    const app = feathers();

    app
      .configure(socketio(socket))
      .configure(reactive(RxJS));

    this.polls = app.service('questions');
  }
}

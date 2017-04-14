import { Injectable } from '@angular/core';
import * as RxJS from 'rxjs';
import 'rxjs/add/operator/map';

import * as io from 'socket.io-client';
import * as feathers from 'feathers/client';
import * as socketio from 'feathers-socketio/client';
import * as reactive from 'feathers-reactive';

import { APIService } from './api-service';

@Injectable()
export class LabelService extends APIService {
  labels: any;

  constructor() {
    super();

    const socket = io(this.url);
    const app = feathers();

    app
      .configure(socketio(socket))
      .configure(reactive(RxJS));

    this.labels = app.service('labels');
  }

  find() {
    return this.labels.find({
      query: {
        $sort: {
          text: 1
        }
      }
    });
  }

  create(label) {
    return this.labels.create(label);
  }

  edit(label) {
    return this.labels.patch(label._id, {
      text: label.text
    });
  }

  remove(label) {
    return this.labels.remove(label._id);
  }
}

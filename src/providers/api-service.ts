import * as RxJS from 'rxjs';
import 'rxjs/add/operator/map';

import * as io from 'socket.io-client';
import * as feathers from 'feathers/client';
import * as socketio from 'feathers-socketio/client';
import * as reactive from 'feathers-reactive';
import * as hooks from 'feathers-hooks';
import * as localstorage from 'feathers-localstorage';
import * as authentication from 'feathers-authentication-client';

export abstract class APIService {

  // private _url: string = 'http://192.168.0.175:3030';

  // digital ocean
  // private _url: string = 'http://174.138.64.141:3030';

  // heroku
  // private _url: string = 'https://rsa-app.herokuapp.com';

  private _url: string = 'http://localhost:3030';
  public socket: any;
  public app: any;

  constructor() {
    this.socket = io(this.url);
    this.app = feathers();

    this.app
      .configure(hooks())
      .configure(socketio(this.socket))
      .configure(reactive(RxJS))
      .configure(authentication({ storage: window.localStorage }));
  }

  get url(): string {
    return this._url;
  }
}

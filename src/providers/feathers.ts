import { Injectable } from '@angular/core';

import * as RxJS from 'rxjs';
import 'rxjs/add/operator/map';

import * as io from 'socket.io-client';
import * as feathers from 'feathers/client';
import * as socketio from 'feathers-socketio/client';
import * as reactive from 'feathers-reactive';
import * as hooks from 'feathers-hooks';
// import * as localstorage from 'feathers-localstorage';
import * as authentication from 'feathers-authentication-client';

@Injectable()
export class FeathersProvider {

  // private _url: string = 'http://192.168.0.175:3030';

  // digital ocean
  // private _url: string = 'https://server.univasf-buddy.club';

  // heroku
  // private _url: string = 'https://rsa-app.herokuapp.com';

  private _url: string = 'http://localhost:3030';
  private _socket: any;
  public app: any;

  constructor() {
    this._socket = io(this._url);
    this.app = feathers();

    this.app
      .configure(hooks())
      .configure(socketio(this._socket))
      .configure(reactive(RxJS))
      .configure(authentication({ storage: localStorage }));
  }

  socket() {
    return this._socket;
  }

  getJwt(token): Promise<any> {
    return this.app.passport.verifyJWT(token);
  }

  // expose services
  service(name: string) {
    return this.app.service(name);
  }

  // expose authentication
  authenticate(credentials?): Promise<any> {
    return this.app.authenticate(credentials);
  }

  // expose logout
  logout() {
    return this.app.logout();
  }

}

import {
  Injectable
} from '@angular/core';

import {
  APIService
} from './api-service';

import * as authentication from 'feathers-authentication-client';

@Injectable()
export class AuthProvider extends APIService {

  constructor() {
    super();

    this.app
      .configure(authentication({ storage: localStorage }));
  }

  // Log in either using the given email/password or the token from storage
  login(credentials) {
    const payload = credentials ?
      Object.assign({
        strategy: 'local'
      }, credentials) : {};

    return this.app.authenticate(payload)
      .then(response => {
        console.log('Authenticated!', response);
        return this.app.passport.verifyJWT(response.accessToken);
      })
      .catch((error) => console.info('ERROR::auth::login()', error));
  }

  loginFromToken() {
    return this.app.authenticate()
      .then(response => {
        console.log('Authenticated!', response);
        return this.app.passport.verifyJWT(response.accessToken);
      })
      .catch((error) => console.info('ERROR::auth::loginFromToken()', error));
  }
}

import {
  Injectable
} from '@angular/core';

import { FeathersProvider } from './feathers';

@Injectable()
export class AuthProvider {

  constructor(public app: FeathersProvider) { }

  login(credentials) {
    const payload = credentials ?
      Object.assign({
        strategy: 'local'
      }, credentials) : {};

    return this.app.authenticate(payload)
      .then(response => {
        console.log('Authenticated!', response);
        return this.app.getJwt(response.accessToken);
        // return this.app.passport.verifyJWT(response.accessToken);
      })
      .catch((error) => console.info('ERROR::auth::login()', error));
  }

  loginFromToken() {
    return this.app.authenticate()
      .then(response => {
        console.log('Authenticated!', response);
        // return this.app.passport.verifyJWT(response.accessToken);
      })
      .catch((error) => console.info('ERROR::auth::loginFromToken()', error));
  }
}

import {
  Injectable
} from '@angular/core';

import {
  APIService
} from './api-service';

@Injectable()
export class AuthProvider extends APIService {

  constructor() {
    super();
  }

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

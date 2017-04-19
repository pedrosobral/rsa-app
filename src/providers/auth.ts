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
        return this.app.getJwt(response.accessToken);
      })
      .catch((error) => console.info('ERROR::auth::login()', error));
  }

  isLoggedIn(): Promise<boolean> {
    return this.app.authenticate()
      .then(() => true)
      .catch(() => false);
  }
}

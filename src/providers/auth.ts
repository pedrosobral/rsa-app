import {
  Injectable
} from '@angular/core';

import { FeathersProvider } from './feathers';
import { UsersProvider } from './users';

@Injectable()
export class AuthProvider {

  constructor(
    public app: FeathersProvider,
    public user: UsersProvider,
  ) { }

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
      .then((response) => {
        return this.app.getJwt(response.accessToken)
      })
      .then((payload) => {
        return this.user.user(payload.userId);
      })
      .then((user) => {
        this.app.app.set('user', user);
        return true;
      })
      .catch(() => false);
  }
}

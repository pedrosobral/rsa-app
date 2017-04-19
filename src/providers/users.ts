import { Injectable } from '@angular/core';
// import { APIService } from './api-service';
import { FeathersProvider } from './feathers';

@Injectable()
export class UsersProvider {
  users = this.app.service('users');

  constructor(public app: FeathersProvider) { }

  user(id) {
    return this.users.get(id);
  }

  create(user) {
    return this.users.create(user);
  }

  edit(user) {
    // TODO
    return this.users.patch(user._id, { text: user.text });
  }

  remove(user) {
    return this.users.remove(user._id);
  }
}

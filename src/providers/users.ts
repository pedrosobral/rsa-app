import { Injectable } from '@angular/core';
import { APIService } from './api-service';

@Injectable()
export class UsersProvider extends APIService {
  users: any;

  constructor() {
    super();

    this.users = this.app.service('users');
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

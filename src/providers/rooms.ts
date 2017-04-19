import { Injectable } from '@angular/core';

import { FeathersProvider } from './feathers';

@Injectable()
export class RoomsProvider {
  rooms = this.app.service('rooms');

  constructor(public app: FeathersProvider) { }

  find() {
    return this.rooms.find({
      query: {
        $sort: {
          name: 1
        }
      },
      rx: {
        listStrategy: 'always'
      }
    });
  }

  room(code) {
    return this.rooms.find({
      query: {
        code: code,
        $populate: [{ path: 'user', select: 'name'}],
        $select: ['name', 'user'],
      }
    });
  }

  create(room) {
    return this.rooms.create(room);
  }

  active() {
    return this.rooms.find({
      query: {
        online: true
      },
      rx: {
        listStrategy: 'always'
      }
    });
  }

  activate(room, value) {
    return this.rooms.patch(room._id, {
      online: value
    });
  }

  edit(room) {
    return this.rooms.patch(room._id, room);
  }

  setStudents(room, students) {
    return this.rooms.patch(room._id, {
      students,
    });
  }

  remove(room) {
    return this.rooms.remove(room._id);
  }
}

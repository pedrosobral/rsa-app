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
        $populate: [{ path: 'user', select: 'name' }],
        $select: ['name', 'user', 'private'],
      }
    });
  }

  create(room) {
    return this.rooms.create(room);
  }

  active() {
    const user = this.app.app.get('user');

    return this.rooms.find({
      query: {
        user: user._id,
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
      private: true,
    });
  }

  login(room, studentId) {
    return this.rooms.find({
      query: {
        '_id': room._id,
        'students.id': studentId,
        '$select': ['name', 'students']
      }
    }).then((result) => {
      if (!result.total) return false;

      // only student returned
      // b/c of a hook after to filter students
      const student = result.data[0].students;

      return this.doLogin(room, studentId, student);
    });
  }

  private doLogin(room, studentId, student) {
    return this.rooms.patch(room._id, {
      $set: {
        'students.$.online': true
      }
    }, {
        query: {
          'students.id': studentId,
          '$select': ['name']
        }
      }).then(() => student);
  }

  remove(room) {
    return this.rooms.remove(room._id);
  }
}

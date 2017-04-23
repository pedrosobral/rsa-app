import { Injectable } from '@angular/core';
import { FeathersProvider } from './feathers';

@Injectable()
export class AttendanceProvider {
  attendance = this.app.service('attendance');

  constructor(public app: FeathersProvider) { }

  find(room) {
    return this.attendance.find({
      query: {
        $limit: 1,
        room: room._id,
        online: true,
      },
      rx: {
        listStrategy: 'always'
      }
    });
  }

  get(id) {
    return this.attendance.get(id);
  }

  setAttendance(attendance, student, value) {
    console.info('value', value);
    return this.attendance.patch(attendance._id, {
      ['students.$.present']: value,
    }, {
      query: {
        'students._id': student._id,
        $select: ['_id']
      }
    });
  }

  all(room) {
    return this.attendance.find({
      query: {
        room: room._id,
      },
      rx: {
        listStrategy: 'always'
      }
    });
  }

  room(room, student) {
    return this.attendance.find({
      query: {
        room: room._id,
        online: true,
        $select: ['']
      }
    });
  }

  attendanceRoom(attendance) {
    return this.attendance.find({
      query: {
        _id: attendance._id,
        online: false,
        $select: ['']
      },
      rx: {
        listStrategy: 'always'
      }
    });
  }

  stop(attendance) {
    return this.attendance.patch(attendance._id, {
      online: false,
    }, {
      query: {
        $select: ['']
      }
    });
  }

  take(attendance, code, student) {
    return this.attendance.patch(null, {
      ['students.$.present']: true,
    }, {
      query: {
        _id: attendance._id,
        code: code,
        online: true,
        'students._id': student._id,
        $select: ['']
      }
    });
  }

  create(attendance) {
    return this.attendance.create(attendance);
  }

  edit(attendance) {
    return this.attendance.patch(attendance._id, {
      text: attendance.text
    });
  }

  remove(attendance) {
    return this.attendance.remove(attendance._id);
  }
}

import { Injectable } from '@angular/core';
import { FeathersProvider } from './feathers';

@Injectable()
export class AttendanceProvider {
  attendance = this.app.service('attendance');

  constructor(public app: FeathersProvider) { }

  find() {
    return this.attendance.find({
      query: {
        $sort: {
          text: 1
        }
      },
      rx: {
        listStrategy: 'always'
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

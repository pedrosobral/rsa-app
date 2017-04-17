import { Injectable } from '@angular/core';
import { APIService } from './api-service';

@Injectable()
export class RoomsProvider extends APIService {
  rooms: any;

  constructor() {
    super();

    this.rooms = this.app.service('rooms');
  }

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

  remove(room) {
    return this.rooms.remove(room._id);
  }
}

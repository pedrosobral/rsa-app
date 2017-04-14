import { Injectable } from '@angular/core';
import { APIService } from './api-service';

@Injectable()
export class LabelService extends APIService {
  labels: any;

  constructor() {
    super();

    this.labels = this.app.service('labels');
  }

  find() {
    return this.labels.find({
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

  create(label) {
    return this.labels.create(label);
  }

  edit(label) {
    return this.labels.patch(label._id, {
      text: label.text
    });
  }

  remove(label) {
    return this.labels.remove(label._id);
  }
}

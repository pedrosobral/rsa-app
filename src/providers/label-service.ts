import { Injectable } from '@angular/core';
import { FeathersProvider } from './feathers';

@Injectable()
export class LabelService {
  labels = this.app.service('labels');

  constructor(public app: FeathersProvider) { }

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

import { Injectable } from '@angular/core';

import { FeathersProvider } from './feathers';

@Injectable()
export class QuestionService {
  questions = this.app.service('questions');

  constructor(public app: FeathersProvider) { }

  find() {
    const user = this.app.app.get('user');

    return this.questions.find({
      query: {
        user: user._id,
        $populate: ['labels']
      }
    });
  }

  findByLabel(label) {
    const user = this.app.app.get('user');

    return this.questions.find({
      query: {
        user: user._id,
        labels: label,
        $populate: ['labels']
      }
    });
  }

  create(question) {
    return this.questions.create(question);
  }

  edit(question) {
    return this.questions.update(question._id, question);
  }

  setLabels(question, labels) {
    return this.questions.patch(question._id, {
      labels
    });
  }

  remove(question) {
    return this.questions.remove(question._id);
  }
}

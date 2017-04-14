import { Injectable } from '@angular/core';
import { APIService } from './api-service';

@Injectable()
export class QuestionService extends APIService {
  questions: any;

  constructor() {
    super();

    this.questions = this.app.service('questions');
  }

  find() {
    return this.questions.find({
      query: {
        $populate: ['labels']
      }
    });
  }

  findByLabel(label) {
    return this.questions.find({
      query: {
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

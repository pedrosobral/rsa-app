import { Injectable } from '@angular/core';
import { APIService } from './api-service';

@Injectable()
export class PollService extends APIService {
  polls: any;

  constructor() {
    super();

    this.polls = this.app.service('polls');
  }

  create(poll) {
    return this.polls.create(poll);
  }

  poll(room: String) {
    return this.polls.find({
      query: {
        room: room,
        isOver: false
      },
      rx: {
         listStrategy: 'always'
     }
    });
  }

  sessions() {
    return this.polls.find({ query: { isOver: true, $sort: { createdAt: -1 } } });
  }

  setIsOver(poll) {
    return this.polls.patch(poll._id, {
      isOver: true
    });
  }

  setAvailable(poll, value) {
    return this.polls.patch(poll._id, {
      "available": value
    });
  }

  showChart(poll, questionIndex, value) {
    return this.polls.patch(poll._id, {
      [`questions.${questionIndex}.showChart`]: value
    });
  }

  showAnswer(poll, questionIndex, value) {
    return this.polls.patch(poll._id, {
      [`questions.${questionIndex}.showAnswer`]: value
    });
  }

  answer(poll, questionIndex, answer) {
    return this.polls.patch(poll._id, {
      "$inc": {
        [`questions.${questionIndex}.options.$.votes`]: 1
      }
    }, {
        query: {
          [`questions.${questionIndex}.options.text`]: answer
        }
      })
  }
}

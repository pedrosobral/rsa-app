import { Injectable } from '@angular/core';

import { FeathersProvider } from './feathers';

@Injectable()
export class PollService {
  polls = this.app.service('polls');

  constructor(public app: FeathersProvider) { }

  create(poll) {
    return this.polls.create(poll);
  }

  poll(room: any) {
    return this.polls.find({
      query: {
        'room.code': room.code,
        isOver: false,
      },
      rx: {
        listStrategy: 'always'
      }
    });
  }

  sessions() {
    const user = this.app.app.get('user');

    return this.polls.find({
      query: {
        user: user._id,
        isOver: true, $sort: { createdAt: -1 }
      }
    });
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

  answer(poll, student, questionIndex, answer) {
    if (!student) {
      return this.anonymousAnswer(poll, questionIndex, answer);
    }

    return this.studentAnswer(poll, student, questionIndex, answer);
  }

  shortAnswer(poll, student, questionIndex, answer) {
    return this.polls.patch(poll._id, {
      "$inc": {
        [`questions.${questionIndex}.votes`]: 1,
      },
      [`questions.${questionIndex}.students.$.answer`]: answer,
    }, {
        query: {
          [`questions.${questionIndex}.students._id`]: student && student._id,
          $select: ['']
        }
      });
  }

  anonymousShortAnswer(poll, questionIndex, answer) {
    return this.polls.patch(poll._id, {
      "$inc": {
        [`questions.${questionIndex}.votes`]: 1,
      },
      "$push": {
        [`questions.${questionIndex}.anonymousShortAnswers`]: answer,
      }
    }, {
        query: {
          $select: ['']
        }
      });
  }

  private studentAnswer(poll, student, questionIndex, answer) {
    return this.polls.patch(poll._id, {
      "$inc": {
        [`questions.${questionIndex}.options.${answer.index}.votes`]: 1,
        [`questions.${questionIndex}.votes`]: 1,
      },
      [`questions.${questionIndex}.students.$.answer`]: answer,
    }, {
        query: {
          [`questions.${questionIndex}.students._id`]: student && student._id,
          $select: ['']
        }
      });
  }

  private anonymousAnswer(poll, questionIndex, answer) {
    return this.polls.patch(poll._id, {
      "$inc": {
        [`questions.${questionIndex}.options.${answer.index}.votes`]: 1,
        [`questions.${questionIndex}.votes`]: 1,
      },
    }, { query: { $select: [''] } });
  }
}

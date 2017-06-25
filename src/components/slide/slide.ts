import {
  Component,
  Input,
} from '@angular/core';

import * as WordCloud from 'wordcloud';

@Component({
  selector: 'slide',
  templateUrl: 'slide.html'
})
export class SlideComponent {
  labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  results = [];

  @Input() question: any;
  @Input() poll: any;
  @Input() settings: any;

  constructor() { }

  ngOnChanges(changes) {
    if (changes.question) {
      if (this.question.type === 'free') {
        setTimeout(() => this.doWordCloud(), 100);
      } else {
        this.dataChart();
      }
    }
  }

  dataChart() {
    const calcPercentage = (votes = 0, total = 1) => votes / total;
    const toPercentage = (number) => Math.floor(number * 100) + '%';

    const totalVotes = this.question.votes;
    this.results = this.question.options
      .map(option => calcPercentage(option.votes, totalVotes))
      .map(toPercentage);
  }

  doWordFreq() {
    let freq = [];
    this.question.students.forEach((student) => {
      if (!student.answer) return;

      freq.push([student.answer, 5]);
    });

    // case anonymous answers
    this.question.anonymousShortAnswers.forEach((answer) => {
      if (!answer) return;

      freq.push([answer, 5]);
    });

    return freq;
  }

  doWordCloud() {
    const data = this.doWordFreq();
    WordCloud(document.getElementById(this.question._id+''), { list: data, gridSize: 20, minFont: 100, weightFactor: 12 });
  }

}

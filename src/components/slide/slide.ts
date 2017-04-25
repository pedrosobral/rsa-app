import {
  Component,
  Input,
} from '@angular/core';

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
      this.dataChart();
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

}

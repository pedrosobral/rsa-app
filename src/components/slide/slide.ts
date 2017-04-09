import {
  Component,
  ViewChild,
  Input,
  AfterViewInit,
} from '@angular/core';

import { Chart } from 'chart.js';

@Component({
  selector: 'section',
  templateUrl: 'slide.html'
})
export class SlideComponent implements AfterViewInit {
  @ViewChild('canvas') canvas;
  chart: any;

  labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  @Input() question: any;
  @Input() poll: any;

  constructor() { }

  ngAfterViewInit() {
    // this.initChart(['A', 'B', 'C', 'D'], [1,2,3,4]);
  }

  ngOnChanges(changes) {
    if (changes.question) {
      this.chartData();
    }
  }

  chartData() {
    const sum = this.sumVotes();
    // this.totalVotes = sum;

    const data = this.question.options.map(x => x.votes / sum);
    const labels = this.getLabels();

    this.initChart(labels, data)
    this.plugin();
  }

  getLabels() {
    let labels = [];
    for (let i = 0; i < this.question.options.length; i++) {
      labels.push(this.labels[i]);
    }
    return labels;
  }

  sumVotes() {
    return this.question.options.reduce((p, c) => {
      c.votes = c.votes || 0;
      return p + parseInt(c.votes, 10);
    }, 0);
  }

  initChart(labels, data) {
    this.chart = new Chart(this.canvas.nativeElement, {
      type: 'bar',
      // type: 'horizontalBar',
      data: {
        labels,
        datasets: [{
          label: '# of Votes',
          data,
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 206, 86)',
            'rgb(75, 192, 192)',
            'rgb(153, 102, 255)',
            'rgb(255, 159, 64)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        tooltips: {
          enabled: false,
        },
        legend: {
          display: false,
        },
        scales: {
          yAxes: [{
            ticks: {
              max: 1,
              beginAtZero: true
            }
          }],
          xAxes: [{
            ticks: {
              beginAtZero: true,
              fontSize: 30
            }
          }]
        }
      }
    });
  }

  // Define a plugin to provide data labels
  plugin() {
    Chart.plugins.register({
      afterDatasetsDraw: (chart, easing) => {
        // To only draw at the end of animation, check for easing === 1
        const ctx = chart.chart.ctx;
        chart.data.datasets.forEach((dataset, i) => {

          const meta = chart.getDatasetMeta(i);
          if (!meta.hidden) {
            meta.data.forEach((element, index) => {
              // Draw the text in black, with the specified font
              ctx.fillStyle = 'rgb(0,0,0)';
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';

              const fontSize = element._chart.width / 17;
              const fontStyle = 'bold';
              const fontFamily = 'Helvetica Neue';
              ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);

              // Just naively convert to string for now
              const dataString = Math.floor(dataset.data[index] * 100) + '%';

              // Make sure alignment settings are correct
              const position = element.tooltipPosition();

              // print
              ctx.fillText(dataString, element._model.x, position.y - (fontSize / 2));
            });
          }
        });
      }
    });
  }

}

import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Chart, pattern } from 'chart.js';

import {
  PollService,
} from '../../providers/providers';

@Component({
  selector: 'page-professor-live',
  templateUrl: 'professor-live.html'
})
export class ProfessorLivePage {
  @ViewChild('barCanvas') barCanvas;

  barChart: any;
  data: any = {};

  constructor(
    public ps: PollService,
    public navCtrl: NavController,
    public navParams: NavParams) { }

  ionViewDidLoad() {

    this.ps.poll('FISC123').subscribe((poll) => {
      if (!poll.data.length) return;
      console.info('poll', poll);
      this.data['questions'] = poll.data[0].questions;
      console.info('data', this.data);
      const labels = this.data.questions[0].options.map(x => x.text);
      console.info('labels', labels)
      let sum = this.data.questions[0].options.reduce((p, c) => {
        c.votes = c.votes || 0;
        return p + parseInt(c.votes, 10);
      }, 0);

      const data = this.data.questions[0].options.map(x => x.votes / sum);

      this.initChart(labels, data);
      this.plugin();
    });
  }

  initChart(labels, data) {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
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
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  plugin() {
    // Define a plugin to provide data labels
    Chart.plugins.register({
      afterDatasetsDraw: (chart, easing) => {
        // To only draw at the end of animation, check for easing === 1
        const ctx = chart.chart.ctx;
        chart.data.datasets.forEach((dataset, i) => {
          //
          // const sum = dataset.data.reduce((sum, value) => {
          //   return sum + value;
          // }, 0);

          // console.info('sum', sum);

          const meta = chart.getDatasetMeta(i);
          if (!meta.hidden) {
            meta.data.forEach((element, index) => {
              // Draw the text in black, with the specified font
              ctx.fillStyle = 'rgb(0,0,0)';
              const fontSize = element._chart.width / 17;
              const fontStyle = 'bold';
              const fontFamily = 'Helvetica Neue';
              ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);

              // Just naively convert to string for now
              const dataString = Math.floor(dataset.data[index] * 100) + '%';

              console.info('%', dataString);

              // Make sure alignment settings are correct
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              const position = element.tooltipPosition();
              ctx.fillText(dataString, element._model.x, position.y - (fontSize / 2));
            });
          }
        });
      }
    });
  }

}

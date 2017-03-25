import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, FabContainer } from 'ionic-angular';

import { Chart } from 'chart.js';

import {
  PollService,
} from '../../providers/providers';

@Component({
  selector: 'page-professor-live',
  templateUrl: 'professor-live.html'
})
export class ProfessorLivePage {
  @ViewChild('canvas') canvas;
  @ViewChild('fab') fab: FabContainer;

  alternativeLabels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  chart: any;
  data: any = {};
  poll: any;

  isAvailable: boolean = false;
  isChartVisible: boolean = false;
  isFullscreen: boolean = false;

  constructor(
    public ps: PollService,
    public navCtrl: NavController,
    public navParams: NavParams) { }

  ionViewDidLoad() {
    this.fab.toggleList();

    this.ps.poll('FISC123').subscribe((poll) => {
      if (!poll.data.length) return;

      this.poll = poll.data[0];
      this.data['questions'] = this.poll.questions[0];

      const sum = this.sumVotes();
      const data = this.data.questions.options.map(x => x.votes / sum);
      const labels = this.getLabels();

      this.initChart(labels, data);
      this.plugin();
    });
  }

  sumVotes() {
    return this.data.questions.options.reduce((p, c) => {
      c.votes = c.votes || 0;
      return p + parseInt(c.votes, 10);
    }, 0);
  }

  stop() {
    this.ps.setAvailable(this.poll, !this.poll.available);
  }

  showChart() {
    this.isChartVisible = !this.isChartVisible;
  }

  getLabels() {
    let labels = [];
    for (let i = 0; i < this.data.questions.options.length; i++) {
      labels.push(this.alternativeLabels[i]);
    }
    return labels;
  }

  fullscreen() {
    if (this.isFullscreen) {
      exitFullscreen();
    } else {
      launchIntoFullscreen(document.documentElement);
    }
    this.isFullscreen = !this.isFullscreen;
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

// Find the right method, call on correct element
function launchIntoFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

// Whack fullscreen
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

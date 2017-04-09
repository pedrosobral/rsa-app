import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams, FabContainer } from 'ionic-angular';

import * as Reveal from 'reveal.js';

import {
  PollService,
} from '../../providers/providers';

@Component({
  selector: 'page-professor-live',
  templateUrl: 'professor-live.html'
})
export class ProfessorLivePage {
  @ViewChild('fab') fab: FabContainer;

  poll: any;
  questions: any;

  currentSlide: number;
  isChartAvailable: boolean;
  isAnswerAvailable: boolean;

  isFullscreen: boolean = false;

  settings = {};

  constructor(
    public ps: PollService,
    public navParams: NavParams,
    public navCtrl: NavController,
    public cdf: ChangeDetectorRef,
  ) { }

  ionViewDidLoad() {
    // open fab button
    this.fab.toggleList();

    // get data
    this.initializeData();
  }

  initializeData() {
    this.ps.poll('FISC123').subscribe((poll) => {
      if (!poll.data.length) return;

      this.poll = poll.data[0];
      this.questions = this.poll.questions;

      // $scope.$apply()
      this.cdf.detectChanges();

      // init slides engine
      this.initializeReveal();

      // apply changes
      Reveal.setState(Reveal.getState());

      // set fab actions state
      this.currentSlide = Reveal.getState().indexh;
      this.isChartAvailable = this.poll.questions[this.currentSlide].showChart;
      this.isAnswerAvailable = this.poll.questions[this.currentSlide].showAnswer;

      // settings
      this.updateSettings();
    });
  }

  updateSettings() {
    this.settings['available'] = this.currentSlide === this.poll.available;
  }

  initializeReveal() {
    Reveal.initialize({
      controls: false,

      // Enable the slide overview mode
      overview: false,

      // Vertical centering of slides
      center: false,
    });

    Reveal.addEventListener('slidechanged', (event) => {
      // TODO: called to many times
      // check to avoid many call
      if (event.indexh === this.currentSlide) return;

      this.currentSlide = event.indexh;
      this.isChartAvailable = this.poll.questions[this.currentSlide].showChart;
      this.isAnswerAvailable = this.poll.questions[this.currentSlide].showAnswer;

      // settings
      this.updateSettings();

      // if fullscreen, available is automatically
      if (this.isFullscreen) {
        this.setPollAvailable();
      }
    });
  }

  showAnswer() {
    const question = this.poll.questions[this.currentSlide];
    this.isAnswerAvailable = !question.showAnswer;

    this.ps.showAnswer(this.poll, this.currentSlide, !question.showAnswer);
  }

  stop() {
    this.currentSlide = Reveal.getState().indexh;

    if (this.poll.available === this.currentSlide) {
      // pause case
      this.setPollUnavailable();
    } else {
      // activate
      this.setPollAvailable();
    }
  }

  setPollAvailable() {
    this.ps.setAvailable(this.poll, this.currentSlide);
  }

  setPollUnavailable() {
    this.ps.setAvailable(this.poll, -1);
  }

  showChart() {
    const question = this.poll.questions[this.currentSlide];
    this.isChartAvailable = !question.showChart;

    this.ps.showChart(this.poll, this.currentSlide, !question.showChart);
  }

  fullscreen() {
    if (this.isFullscreen) {
      exitFullscreen();
    } else {
      launchIntoFullscreen(document.documentElement);
      this.setPollAvailable();
    }
    this.isFullscreen = !this.isFullscreen;
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

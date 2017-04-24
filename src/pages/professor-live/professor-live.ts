import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';

import {
  IonicPage,
  Events,
  NavController,
  FabContainer,
} from 'ionic-angular';

import * as Reveal from 'reveal.js';

import {
  PollService,
  RoomsProvider,
  AttendanceProvider,
} from '../../providers/providers';

@IonicPage({
  segment: 'polls'
})
@Component({
  selector: 'page-professor-live',
  templateUrl: 'professor-live.html',
})
export class ProfessorLivePage {
  @ViewChild('fab') fab: FabContainer;

  sessions: any;

  poll: any;
  questions: any;

  currentSlide: number;
  isChartAvailable: boolean;
  isAnswerAvailable: boolean;

  isFullscreen: boolean = false;

  settings = {};

  room: any;

  attendance: any;

  /**
   * Used to control fab options
   */
  appState: string = 'SHOW_LIST'; // 'TAKE_ATTENDANCE' 'POLL_LIVE', SHOW_OLD_POLL
  previousState: string = 'SHOW_LIST';

  constructor(
    public attendanceProvider: AttendanceProvider,
    public ps: PollService,
    public rs: RoomsProvider,
    public navCtrl: NavController,
    public cdf: ChangeDetectorRef,
    public events: Events,
  ) {
    this.events.subscribe('room:live', (room) => {
      this.room = room;
      this.initializeData();
    });
    //
    this.events.subscribe('attendance:live', (attendance) => {
      this.initAttendance(this.room);
    });
  }

  ionViewDidLoad() {
    // open fab button
    this.fab.toggleList();

    // get poll
    this.initializeData();

    // get sessions
    this.getOldSessions();

    // get default room
    !this.room && this.rs.active()
      .then((result) => {
        if (!result.total) return;

        this.room = result.data[0];
        this.initializeData();

        // attendance
        this.initAttendance(this.room);
      });
  }

  initializeData() {
    this.room && this.ps.poll(this.room.code).subscribe((poll) => {
      if (!poll.data.length) return;

      // force no view mode
      // this.appState = 'POLL_LIVE';
      this.setState('POLL_LIVE');

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

  initAttendance(attendance) {

    this.attendanceProvider.find(attendance)
      .subscribe((res) => {
        if (!res.total) return;

        this.attendance = res.data[0];

        this.appState = 'TAKE_ATTENDANCE';
      });
  }

  getOldSessions() {
    this.ps.sessions().then((sessions) => {
      this.sessions = [];
      sessions.data.forEach((session) => {
        this.sessions.push(session);
      });
    });
  }

  goToDetails(poll) {
    // this.appState = 'SHOW_OLD_POLL';
    this.setState('SHOW_OLD_POLL');

    this.poll = poll;
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
  }

  exitViewMode() {
    // this.appState = 'SHOW_LIST';
    this.setState('SHOW_LIST');

    this.end();
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

      minScale: 1,
    });

    Reveal.addEventListener('slidechanged', (event) => {
      // TODO: called to many times
      // check to avoid many calls
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

  /**
   * End current session
   */
  end() {
    this.ps.setIsOver(this.poll);

    // clear var
    this.poll = null;

    // update app state
    // this.appState = 'SHOW_LIST';
    this.setState('SHOW_LIST');

    // old sessions
    this.getOldSessions();
  }

  pauseAttendance() {
    this.attendanceProvider
      .stop(this.attendance)
      .then(() => {
        // TODO: pop history
        // this.appState = 'SHOW_LIST';
        this.backState();
      });
  }

  endAttendance() {
    this.attendanceProvider
      .stop(this.attendance)
      .then(() => {
        // TODO: pop history
        // this.appState = 'SHOW_LIST';
        this.backState();
      });
  }

  setState(state: string) {
    this.previousState = this.appState;
    this.appState = state;
  }

  backState() {
    this.setState(this.previousState);
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

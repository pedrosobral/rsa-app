import { Component, ViewChild } from '@angular/core';
import { FabContainer, IonicPage, NavController, NavParams } from 'ionic-angular';

import *  as Papa from 'papaparse';

@IonicPage({
  segment: 'poll/details',
})
@Component({
  selector: 'page-professor-session-results',
  templateUrl: 'professor-session-results.html',
})
export class ProfessorSessionResultsPage {
  @ViewChild('fab') fab: FabContainer;

  poll = this.navParams.get('poll');

  viewMode = 'questions';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // open fab-button
    this.fab.toggleList();

    // go back if there's no data
    if (!this.poll) {
      this.navCtrl.setRoot('ProfessorLivePage')
        .then(() => {
          this.navCtrl.goToRoot({});
        });
      return;
    }

    this.setStats();
  }

  goToDetails(question) {
    this.navCtrl.push('ProfessorStudentsResultsPage', { question });
  }

  setStats() {
    const questions = this.poll.questions;

    questions.forEach((q) => {
      if (q.type === 'free') return;

      const votes = q.options[q.correct].votes || 0;
      const totalVotes = q.votes;
      q.overall = votes / (totalVotes || 1);
      q.overall = Math.floor(q.overall * 100) + '%';

      q.unanswer = q.students.length - q.votes;
      q.correctAnswers = votes;
      q.wrongAnswers = totalVotes - q.correctAnswers;
    });

    this.statsByStudents();
  }

  statsByStudents() {
    const students = this.poll.room.students;
    const questions = this.poll.questions;

    students.forEach((s) => {
      const answers = [];
      questions.forEach((q) => {
        if (q.type === 'free') {
          const text = q.students.find(x => x._id === s._id).answer;
          answers.push({ type: 'free', text });
          return;
        }

        const answer = q.students.find(x => x._id === s._id).answer;
        answers.push({ answer, correct: answer && answer.index === q.correct });
      });
      s.answers = answers;

      s.overall = answers.filter(x => x.correct).length / questions.filter(q => q.type !== 'free').length;
      s.overall = Math.floor(s.overall * 100) + '%';
    });
  }

  studentsToCSV() {
    let csv = [];
    this.poll.room.students.forEach(student => {
      let row = {};

      row['Nome'] = student.name;

      student.answers.forEach((answer, index) => {
        if (answer.type === 'free') {
          row[`Q${index + 1}`] = answer.text;
        } else {
          row[`Q${index + 1}`] = answer.correct === undefined ? '-' : answer.correct ? 'C' : 'E';
        }
      });

      row['Desempenho (%)'] = student.overall.split('%')[0];

      // add to csv
      csv.push(row);
    });

    this.download(Papa.unparse(csv));
  }

  download(csv) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(csv));
    element.setAttribute('download', 'resultado.csv');

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

}

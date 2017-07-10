import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({
  segment: 'poll/details',
})
@Component({
  selector: 'page-professor-session-results',
  templateUrl: 'professor-session-results.html',
})
export class ProfessorSessionResultsPage {
  poll = this.navParams.get('poll');

  viewMode = 'questions';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
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
        if (q.type === 'free') return;

        const answer = q.students.find(x => x._id === s._id).answer;
        answers.push({ answer, correct: answer && answer.index === q.correct });
      });
      s.answers = answers;

      s.overall = answers.filter(x => x.correct).length / questions.length;
      s.overall = Math.floor(s.overall * 100) + '%';
    });
  }

}

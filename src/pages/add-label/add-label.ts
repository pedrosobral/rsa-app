import { Component } from '@angular/core';

import {
  IonicPage,
  NavController,
  NavParams,
  ViewController,
} from 'ionic-angular';

import {
  QuestionService,
  LabelService,
} from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-add-label',
  templateUrl: 'add-label.html',
})
export class AddLabelPage {
  labels: any;
  questions: any = this.navParams.get('questions');

  constructor(
    public qs: QuestionService,
    public ls: LabelService,
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public navParams: NavParams,
  ) { }

  ionViewWillEnter() {
    this.load();
  }

  load() {
    this.ls.find().subscribe((labels) => {
      this.labels = labels.data;

      this.setSelectedLabels();
    });
  }

  setSelectedLabels() {
    this.questions.forEach((q) => {
      q.labels && q.labels.forEach((l) => {
        const label = this.labels.find((x) => x._id === l._id);
        label.isChecked = true;

        this.incrementCount(label);
      });
    });

    // check if a label is applied to all questions
    this.labels.forEach((label) => {
      if (label.count === this.questions.length) {
        label.isAppliedToAllQuestions = true;
      }
    });
  }

  incrementCount(label) {
    if (!label.count) {
      label.count = 1;
    } else {
      label.count += 1;
    }
  }

  submit() {
    const selectedLabels = this.labels.filter(l => l.isAppliedToAllQuestions)

    this.questions.forEach((q) => {
      this.qs.setLabels(q, selectedLabels);
    });
  }

  close() {
    this.viewCtrl.dismiss();
  }

}

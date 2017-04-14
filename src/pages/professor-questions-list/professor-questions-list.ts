import { Component } from '@angular/core';

import {
  IonicPage,
  ModalController,
  Events,
} from 'ionic-angular';

import {
  LabelService,
} from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-professor-questions-list',
  templateUrl: 'professor-questions-list.html',
})
export class ProfessorQuestionsListPage {
  root = 'ProfessorQuestionsPage'

  labels: any;

  title: string;

  constructor(
    public events: Events,
    public ls: LabelService,
    public modalCtrl: ModalController,
  ) { }

  label() {
    this.modalCtrl.create('NewLabelPage').present();
  }

  filterByLabel(label) {
    this.title = label.text;
    this.events.publish('filter:label', label);
  }

  ionViewDidLoad() {
    this.ls.find().subscribe((labels) => {
      this.labels = labels.data;
    });
  }
}

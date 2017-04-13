import { Component } from '@angular/core';

import {
  IonicPage,
  ModalController,
  NavController,
  NavParams,
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

  constructor(
    public events: Events,
    public ls: LabelService,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public navParams: NavParams,
  ) { }

  label() {
    this.modalCtrl.create('NewLabelPage').present();
  }

  filterByLabel(label) {
    this.events.publish('filter:label', label);
  }

  ionViewDidLoad() {
    this.ls.find().subscribe((labels) => {
      this.labels = labels.data;
    });
  }
}

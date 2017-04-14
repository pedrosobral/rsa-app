import { Component } from '@angular/core';

import {
  IonicPage,
  Events,
  NavController,
  NavParams,
  ViewController,
} from 'ionic-angular';

import {
  Validators,
  FormBuilder,
  FormGroup,
} from '@angular/forms';

import {
  LabelService
} from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-new-label',
  templateUrl: 'new-label.html',
})
export class NewLabelPage {
  form: FormGroup;

  labels: any;

  constructor(
    public ls: LabelService,
    public events: Events,
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public formBuilder: FormBuilder,
  ) {
    this.form = formBuilder.group({
      text: ['', Validators.required],
    });
  }

  ionViewDidLoad() {
    this.ls.find().subscribe((labels) => {
      this.labels = labels.data;
    });
  }

  submit() {
    this.ls.create(this.form.value).then((res) => {
      // clear input
      this.form.reset();
    });
  }

  edit(label) {
    this.ls.edit(label)
      .then(() => this.change());
  }

  remove(label) {
    this.ls.remove(label)
      .then(() => this.change());
  }

  change() {
    this.events.publish('label:changed');
  }

  close() {
    this.viewCtrl.dismiss();
  }

}

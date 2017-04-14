import { Component } from '@angular/core';

import {
  IonicPage,
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
    this.ls.find().subscribe(() => this.refresh());
  }

  refresh() {
    this.ls.find().then((labels) => {
      this.labels = labels.data;
    });
  }

  submit() {
    this.ls.create(this.form.value).then((res) => {
      // clear input
      this.form.reset();

      this.refresh();
    });
  }

  edit(label) {
    this.ls.edit(label).then((res) => {
    });
  }

  remove(label) {
    this.ls.remove(label).then((removed) => { });
  }

  close() {
    this.viewCtrl.dismiss();
  }

}

import { Component } from '@angular/core';

import { reorderArray } from 'ionic-angular';

import {
  Validators,
  FormBuilder,
  FormGroup,
} from '@angular/forms';

import {
  ViewController,
  NavParams,
} from 'ionic-angular';

@Component({
  selector: 'page-professor-new-question',
  templateUrl: 'professor-new-question.html'
})
export class ProfessorNewQuestionPage {
  form: FormGroup;
  options = [{}];

  constructor(
    public viewCtrl: ViewController,
    public formBuilder: FormBuilder,
    public navParams: NavParams,
  ) {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      type: ['mc', Validators.required],
      correct: ['']
    });
  }

  addOption() {
    this.options.push({ name: '' });
  }

  submit() {
    console.info(this.form.value);
  }

  delete(item) {
    this.options.splice(item, 1);
  }

  reorder(indexes) {
    console.info('redorder', indexes);
    this.options = reorderArray(this.options, indexes);
  }

  close() {
    this.viewCtrl.dismiss();
  }

}

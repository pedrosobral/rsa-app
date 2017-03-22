import { Component } from '@angular/core';

import { ToastController } from 'ionic-angular';

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

import {
  QuestionService,
} from '../../providers/providers';

@Component({
  selector: 'page-professor-new-question',
  templateUrl: 'professor-new-question.html'
})
export class ProfessorNewQuestionPage {
  form: FormGroup;
  options = [{}];

  constructor(
    public qs: QuestionService,
    public viewCtrl: ViewController,
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    public toastCtrl: ToastController,
  ) {
    this.form = this.formBuilder.group({
      question: ['', Validators.required],
      description: [''],
      type: ['mc', Validators.required],
      correct: ['']
    });
  }

  addOption() {
    this.options.push({ name: '' });
  }

  submit() {
    let question = Object.assign({}, this.form.value);

    // append options
    if (this.form.value.type === 'mc') {
      Object.assign(question, { options: this.options });
    } else if (this.form.value.type === 'bool') {
      Object.assign(question, { options: [{ name: 'Verdadeiro' }, { name: 'Falso' }] });
    }

    this.qs.create(question)
      .then(() => {
        this.presentToast('Questão criada')
          .then(() => this.close());
      });
  }

  delete(item) {
    this.options.splice(item, 1);
  }

  reorder(indexes) {
    this.options = reorderArray(this.options, indexes);
  }

  close() {
    this.viewCtrl.dismiss();
  }

  presentToast(message) {
      let toast = this.toastCtrl.create({
        message,
        duration: 3000
      });
      return toast.present();
  }

}

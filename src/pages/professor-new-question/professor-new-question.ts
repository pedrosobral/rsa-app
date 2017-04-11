import { Component } from '@angular/core';

import {
  IonicPage,
  ToastController,
} from 'ionic-angular';

import {
  Validators,
  FormBuilder,
  FormGroup,
} from '@angular/forms';

import { reorderArray } from 'ionic-angular';

import {
  ViewController,
  NavParams,
} from 'ionic-angular';

import {
  QuestionService,
} from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-professor-new-question',
  templateUrl: 'professor-new-question.html',
})
export class ProfessorNewQuestionPage {
  form: FormGroup;
  options = [{}];

  isEditMode: boolean = false;

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

    const question = this.navParams.get('question');
    question && this.handleEditMode(question);
  }

  handleEditMode(question) {
    this.isEditMode = true;

    this.form = this.formBuilder.group({
      question: [question.question, Validators.required],
      description: [question.description],
      type: [question.type, Validators.required],
      correct: [question.correct],
      id: [question._id]
    });

    // mc case
    if (question.type === 'mc') {
      this.options = question.options;
    }
  }

  addOption() {
    this.options.push({ text: '' });
  }

  submit() {
    let question = Object.assign({}, this.form.value);

    // append options
    if (this.form.value.type === 'mc') {
      Object.assign(question, { options: this.options });
    } else if (this.form.value.type === 'bool') {
      Object.assign(question, { options: [{ text: 'Verdadeiro' }, { text: 'Falso' }] });
    }

    if (this.isEditMode) {
      this.qs.edit(question)
        .then(() => this.presentToast('Questão atualizada') .then(() => this.close()));
    } else {
      this.qs.create(question)
        .then(() => this.presentToast('Questão criada') .then(() => this.close()));
    }
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

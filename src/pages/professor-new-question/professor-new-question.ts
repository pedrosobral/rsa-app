import { Component } from '@angular/core';

import {
  IonicPage,
  ToastController,
} from 'ionic-angular';

import {
  Validators,
  FormArray,
  FormBuilder,
  FormGroup,
} from '@angular/forms';

// import { reorderArray } from 'ionic-angular';

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
      correct: ['', Validators.required],
      options: this.formBuilder.array([], Validators.minLength(2))
    });

    // check edit option
    const question = this.navParams.get('question');
    question && this.handleEditMode(question);
  }

  updateValidators() {
    this.removeValidatorsOnFreeType();
    this.addBooleanOption();
  }

  addBooleanOption() {
    if (this.form.value.type === 'bool') {
      const control = <FormArray>this.form.controls['options'];
      this.clearControlOptions(control);
      this.addOption('Verdadeiro');
      this.addOption('Falso');
    }
  }

  clearControlOptions(control) {
    const length = control.length;
    for (let i = 0; i < length; i++) {
      control.removeAt(0);
    }
  }

  removeValidatorsOnFreeType() {
    if (this.form.value.type === 'free') {
      this.form.controls['correct'].setValidators(null);
      this.form.controls['correct'].updateValueAndValidity();
    } else {
      this.form.controls['correct'].setValidators(Validators.required);
      this.form.controls['correct'].updateValueAndValidity();
    }
  }

  handleEditMode(question) {
    this.isEditMode = true;

    this.form = this.formBuilder.group({
      question: [question.question, Validators.required],
      description: [question.description],
      type: [question.type, Validators.required],
      correct: [question.correct, Validators.required],
      options: this.formBuilder.array(this.getOptions(question.options), Validators.minLength(2)),
      _id: [question._id]
    });

    this.updateValidators();
  }

  // map array of objects to array of strings
  getOptions(options: Array<any>) {
    return options.map(o => o.text);
  }

  addOption(option?) {
    const control = <FormArray>this.form.controls['options'];
    control.push(this.formBuilder.control(option || '', Validators.required));
  }

  submit() {
    // prevent invalid form from submit
    if (!this.form.valid) {
      return;
    }

    let question = Object.assign({}, this.form.value);

    this.createOptionsObject(question);

    if (this.isEditMode) {
      this.qs.edit(question)
        .then(() => this.close('Questão atualizada'));
    } else {
      this.qs.create(question)
        .then(() => this.close('Questão criada'));
    }
  }

  createOptionsObject(question) {
    if (question.type === 'mc' || question.type === 'bool') {
      let options = [];
      question.options.forEach((option, index) => {
        options.push({ index, text: option });
      });

      question.options = options;
    }
  }

  delete(index) {
    const control = <FormArray>this.form.controls['options'];
    control.removeAt(index);

    this.resetCorrectOptionIndex();
  }

  resetCorrectOptionIndex() {
    this.form.controls['correct'].setValue('');
    this.form.controls['correct'].updateValueAndValidity();
  }

  // reorder(indexes) {
  //   const options = this.form.value.options
  //
  //   this.form.controls['options'].setValue(reorderArray(options, indexes));
  //
  //   // handle correct answer choice reorder
  //   if (indexes.from == this.form.value.correct) {
  //     this.form.controls['correct'].setValue(indexes.to);
  //   }
  // }

  close(message) {
    this.viewCtrl.dismiss(this.isEditMode)
      .then(() => {
        this.presentToast(message);
      });
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message,
      duration: 3000
    });
    return toast.present();
  }

}

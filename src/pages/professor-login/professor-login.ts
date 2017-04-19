import { Component } from '@angular/core';

import {
  IonicPage,
  NavController,
} from 'ionic-angular';

import {
  Validators,
  FormBuilder,
  FormGroup,
} from '@angular/forms';

@IonicPage({
  segment: 'teacher/login',
  defaultHistory: ['HomePage']
})
@Component({
  selector: 'page-professor-login',
  templateUrl: 'professor-login.html',
})
export class ProfessorLoginPage {
  form: FormGroup;

  constructor(
    public fb: FormBuilder,
    public navCtrl: NavController,
  ) {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfessorLoginPage');
  }

}

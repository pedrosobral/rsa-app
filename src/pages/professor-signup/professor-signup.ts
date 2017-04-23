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

import { UsersProvider } from '../../providers/providers';

@IonicPage({
  segment: 'teacher/signup'
})
@Component({
  selector: 'page-professor-signup',
  templateUrl: 'professor-signup.html',
})
export class ProfessorSignupPage {
  form: FormGroup;

  constructor(
    public users: UsersProvider,
    public fb: FormBuilder,
    public navCtrl: NavController,
  ) {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  create() {
    this.users.create(this.form.value)
      .then(() => this.navCtrl.push('ProfessorLoginPage'));
  }

}

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

import {
  AuthProvider,
  UsersProvider,
} from '../../providers/providers';

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
    public auth: AuthProvider,
    public users: UsersProvider,
    public fb: FormBuilder,
    public navCtrl: NavController,
  ) {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  create() {
    this.users.create(this.form.value);
  }

  login() {
    this.auth.login(this.form.value)
      .then((payload) => {
        console.info('payload', payload);
        return this.users.user(payload.userId);
      })
      .then((user) => {
        console.info('user', user);
        // this.auth.app.set('user', user);
        // console.info('user', this.auth.app.get('user'));
      })
      .catch((error) => {
        console.info('error', error);
      });
  }

}

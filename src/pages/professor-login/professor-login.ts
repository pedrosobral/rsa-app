import { Component } from '@angular/core';

import {
  IonicPage,
  NavController,
  LoadingController,
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
    public loadCtrl: LoadingController,
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
    const loading = this.loadCtrl.create({
      content: 'Carregando...',
      dismissOnPageChange: true,
      duration: 11000
    });

    loading.present();

    this.auth.login(this.form.value)
      .then((payload) => {
        return this.users.user(payload.userId);
      })
      .then((user) => {
        this.navCtrl.push('ProfessorTabsPage');
      })
      .catch((error) => {
        loading.dismiss();
        console.info('error', error);
      });
  }

}
